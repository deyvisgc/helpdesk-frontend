import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessage } from 'src/app/core/interface/message.response';
import { Epica, HistoriaUsuario, Propuesta, Requirement, Usuario } from 'src/app/core/interface/requiriments';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ProposaltService } from 'src/app/core/service/proposal.service';
import { RequirementService } from 'src/app/core/service/requerimiento.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-form-proposal',
  templateUrl: './form-proposal.component.html',
  styleUrls: ['./form-proposal.component.scss']
})
export class FormProposalComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() idPropuesta: number = 0;
  @Input() verEpica: boolean = false;
  @Input() verHistoria: boolean = false;

  propuesta: Propuesta = {
    analistaId: 0,
    requerimientoId: 0,
    estimacionTiempo: 0,
    estado: '',
    numeroProgramadores: 0,
    textoPropuesta: ''
  }
  @Input() dataForm: Propuesta = this.propuesta;
  private modalService = inject(NgbModal);
  submitted = signal(false)
  isLoading = signal(false)
  formGrupProposal: FormGroup = new FormGroup({});
  lsAnalista: Usuario[] = []
  lsRequirement: Requirement[] = []
  lsEpica: any = []
  lsHistoriUsers: any = []
  active = 1;

  prioridad = [
    {
      id: "BAJA",
      pr_name: "BAJA",
    },
    {
      id: "MEDIA",
      pr_name: "MEDIA",
    },
    {
      id: "ALTA",
      pr_name: "ALTA",
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private totastService: NotificationService,
    config: NgbModalConfig,
    private userService: UsuarioService,
    private requirementService: RequirementService,
    private proposaltService: ProposaltService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {

    console.log(this.dataForm)
    if (this.verEpica) {
      this.lsEpica = this.dataForm.epica
    }

    if (this.verHistoria) {
      this.lsHistoriUsers = this.dataForm.historiaUsuarios
    }

    this.formGrupProposal = this.formBuilder.group({
      analistaId: ['', Validators.required],
      requerimientoId: ['', Validators.required],
      textoPropuesta: ['', Validators.required],
      estimacionTiempo: ['', Validators.required],
      numeroProgramadores: ['', [Validators.required, Validators.min(1)]],
      historiaUsers: this.formBuilder.array([]),
      epicas: this.formBuilder.array([]),
    });
    this.getAnalistas()
  }
  get historiaUsers() {
    return this.formGrupProposal.get('historiaUsers') as FormArray;
  }
  get epicas() {
    return this.formGrupProposal.get('epicas') as FormArray;
  }
  agregarHistory() {
    const historia = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
    if (this.historiaUsers.length >= 4) {
      this.totastService.error("Está permitido registrar un máximo de 4 Historias de usuario por acción.");
      return
    }
    this.historiaUsers.push(historia);
  }

  agregarEpicas() {
    const epicas = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    if (this.epicas.length >= 4) {
      this.totastService.error("Está permitido registrar un máximo de 4 epicas de usuario por acción.");
      return
    }
    this.epicas.push(epicas);
  }


  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.modalService.dismissAll();
        this.formGrupProposal.reset();
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  eliminar(index: number) {
    this.historiaUsers.removeAt(index);
  }
  eliminarEpica(index: number) {
    this.epicas.removeAt(index);
  }

  guardar() {
    this.submitted.set(true)

    if (this.formGrupProposal.invalid) {
      return;
    }
    const response: Propuesta = {
      analistaId: this.formGrupProposal?.value?.analistaId,
      requerimientoId: this.formGrupProposal?.value?.requerimientoId,
      textoPropuesta: this.formGrupProposal?.value?.textoPropuesta,
      estimacionTiempo: this.formGrupProposal?.value?.estimacionTiempo,
      numeroProgramadores: this.formGrupProposal?.value?.numeroProgramadores,
      historiaUsuarios: this.formGrupProposal?.value?.historiaUsers as HistoriaUsuario[],
      epica: this.formGrupProposal?.value?.epicas as Epica[]
    }
    this.isLoading.set(true)
    this.proposaltService.register(response).subscribe({
      next: (res: ResponseMessage) => {
        this.totastService.success(res?.message);
        this.formGrupProposal.reset();
        this.modalService.dismissAll();
        this.proposaltService.saveStatus(true)
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
        this.modalService.dismissAll();
      },
      complete: () => {
        console.log("finis")
        this.isLoading.set(false)
      },

    })
  }
  getAnalistas() {
    this.userService.getAsignar().subscribe({
      next: (res: Usuario[]) => {
        this.lsAnalista = res
      },
      error: (err: any) => {
        this.totastService.error(err?.error?.error);
      },
    });
  }
  onchangeRequirement(event: any) {
    console.log('Analista seleccionado:', event);
    this.requirementService.getRequerimentByAnlyt(event?.usuarioId).subscribe({
      next: (res: Requirement[]) => {
        this.lsRequirement = res
      },
      error: (err: any) => {
        this.totastService.error(err?.error?.error);
      },
    });
  }
  get f() {
    return this.formGrupProposal;
  }
}
