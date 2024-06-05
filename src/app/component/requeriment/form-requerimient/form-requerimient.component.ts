import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessage } from 'src/app/core/interface/message.response';
import { Requirement, Usuario } from 'src/app/core/interface/requiriments';
import { RequirementService } from 'src/app/core/service/requerimiento.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { RoleEnum } from 'src/app/util/RoleEnum';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-form-requerimient',
  templateUrl: './form-requerimient.component.html',
  styleUrls: ['./form-requerimient.component.scss']
})
export class FormRequerimientComponent {
  @Input() titulo: string = '';
  @Input() idRequerimiento: number = 0;
  @Input() isAsigna: boolean = false;
  requeriment: Requirement = {
    archivo_adjunto: '',
    descripcion: '',
    estado: '',
    nombre_solicitud: '',
    solicitante_id: 0
  }
  @Input() dataForm: Requirement = this.requeriment;
  idUsuario: string = '';
  private modalService = inject(NgbModal);
  title: string = 'Crear Categoria';
  formGrupRequeriment: FormGroup = new FormGroup({});
  formGrupAsignarRequeriment: FormGroup = new FormGroup({});
  submitted = signal(false)
  isLoading = signal(false)
  reqerimiento: Requirement = this.requeriment;
  selectedFile: File | null = null;
  lsAnalista: Usuario[] = []
  titleRequerimiento = ''
  fileShow = ''
  area = [
    {
      id: 1,
      area_name: "Tecnología de la Información (TI)",
    },
    {
      id: 2,
      area_name: "Recursos Humanos (RRHH)",
    },
    {
      id: 3,
      area_name: "Finanzas y Contabilidad",
    },
    {
      id: 4,
      area_name: "Ventas y Marketing",
    },
    {
      id: 5,
      area_name: "Operaciones",
    },
    {
      id: 5,
      area_name: "Atención al Cliente",
    },
    {
      id: 5,
      area_name: "Administración General",
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private totastService: NotificationService,
    config: NgbModalConfig,
    private requerimentService: RequirementService,
    private userService: UsuarioService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {

    if (this.isAsigna) {
      this.titleRequerimiento = this.dataForm?.nombre_solicitud
      this.getAnalistas()
    }
    this.formGrupAsignarRequeriment = this.formBuilder.group({
      requirementId: [this.idRequerimiento, [Validators.required]],
      asignadoId: ['', [Validators.required]]
    });
    this.formGrupRequeriment = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      area: ['', [Validators.required]],
      rol: [RoleEnum.SOLICITANTE, [Validators.required]],
      nombre_solicitud: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
      // file: ['', [Validators.required]],
    });
    if (this.idRequerimiento > 0 && !this.isAsigna) {
      this.setIdit()
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.modalService.dismissAll();
        this.formGrupRequeriment.reset();
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  onSubmit() {
    this.submitted.set(true);
    if (this.formGrupRequeriment.invalid) {
      return;
    }
    const datosJson = {
      "users": {
        "nombre": this.formGrupRequeriment?.value?.nombre,
        "apellidos": this.formGrupRequeriment?.value?.apellidos,
        "area": this.formGrupRequeriment?.value?.area,
        "rol": this.formGrupRequeriment?.value?.rol,
      },
      "requirement": {
        "nombre_solicitud": this.formGrupRequeriment?.value?.nombre_solicitud,
        "descripcion": this.formGrupRequeriment?.value?.descripcion,
        "archivo_adjunto": "",
      }
    }
    if (this.idRequerimiento === 0) {
      if (this.selectedFile instanceof File) {
        this.isLoading.set(true)
        this.requerimentService.register(JSON.stringify(datosJson), this.selectedFile).subscribe({
          next: (res: ResponseMessage) => {
            this.totastService.success(res?.message);
            this.formGrupRequeriment.reset();
            this.modalService.dismissAll();
            this.requerimentService.saveStatus(true)
          },
          error: (err: any) => {
            this.totastService.error(err?.message);
            console.log(err)
            this.modalService.dismissAll();
          },
          complete: () => {
            console.log("finis")
            this.isLoading.set(false)
          },
        })
      }

    } else {
      datosJson.requirement.archivo_adjunto = this.fileShow
      this.isLoading.set(true)
      this.requerimentService.update(this.idRequerimiento.toString(), this.idUsuario, JSON.stringify(datosJson), this.selectedFile).subscribe({
        next: (res: ResponseMessage) => {
          this.totastService.success(res?.message);
          this.formGrupRequeriment.reset();
          this.modalService.dismissAll();
          this.requerimentService.saveStatus(true)
        },
        error: (err: any) => {
          this.totastService.error(err?.message);
          console.log(err)
          this.modalService.dismissAll();
        },
        complete: () => {
          console.log("finis")
          this.isLoading.set(false)
        },
      })

    }

  }
  asignar() {
    this.submitted.set(true);
    if (this.formGrupAsignarRequeriment.invalid) {
      return;
    }
    this.isLoading.set(true)
    const idRequerimiento = this.formGrupAsignarRequeriment?.value?.requirementId
    const idAsignado = this.formGrupAsignarRequeriment?.value?.asignadoId
    this.requerimentService.asignar(idRequerimiento, idAsignado).subscribe({
      next: (res: ResponseMessage) => {
        this.totastService.success(res?.message);
        this.formGrupAsignarRequeriment.reset();
        this.modalService.dismissAll();
        this.requerimentService.saveStatus(true)
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
  get f() {
    return this.formGrupRequeriment;
  }
  setIdit() {
    this.formGrupRequeriment?.setValue({
      nombre: this.dataForm?.solicitante?.nombre,
      apellidos: this.dataForm?.solicitante?.apellidos,
      area: this.dataForm?.solicitante?.area,
      rol: this.dataForm?.solicitante?.rol,
      nombre_solicitud: this.dataForm?.nombre_solicitud,
      descripcion: this.dataForm?.descripcion
    })
    this.fileShow = this.dataForm?.archivo_adjunto
    this.idUsuario = this.dataForm?.solicitante?.usuarioId ? this.dataForm?.solicitante?.usuarioId?.toString() : ''
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
}
