import { Component, Input, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessage } from 'src/app/core/interface/message.response';
import { Usuario } from 'src/app/core/interface/requiriments';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { RoleEnum } from 'src/app/util/RoleEnum';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent {
  @Input() titulo: string = '';
  @Input() usuarioId: number = 0;
  users: Usuario = {
    apellidos: '',
    nombre: '',
    area: '',
    rol: ''
  }
  @Input() dataForm: Usuario = this.users;
  private modalService = inject(NgbModal);
  title: string = 'Crear Categoria';
  formGrupUsers: FormGroup = new FormGroup({});
  submitted = signal(false)
  isLoading = signal(false)
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
  role = [
    {
      id: 1,
      role_name: RoleEnum.ANALISTA,
    },
    {
      id: 2,
      role_name: RoleEnum.COORDINADOR,
    },
    {
      id: 3,
      role_name: RoleEnum.JEFEAREA,
    },
    {
      id: 4,
      role_name: RoleEnum.SOLICITANTE,
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private totastService: NotificationService,
    config: NgbModalConfig,
    private userService: UsuarioService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.formGrupUsers = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      area: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    });
    if (this.usuarioId > 0) {
      this.setIdit()
    }
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.modalService.dismissAll();
        this.formGrupUsers.reset();
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  onSubmit() {
    this.submitted.set(true);
    if (this.formGrupUsers.invalid) {
      return;
    }
    const users = this.formGrupUsers.value as Usuario

    if (this.usuarioId === 0) {
      this.isLoading.set(true)
      this.userService.register(users).subscribe({
        next: (res: ResponseMessage) => {
          this.totastService.success(res?.message);
          this.formGrupUsers.reset();
          this.modalService.dismissAll();
          this.userService.saveStatus(true)
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

    } else {
      this.isLoading.set(true)
      this.userService.update(this.usuarioId, users).subscribe({
        next: (res: ResponseMessage) => {
          this.totastService.success(res?.message);
          this.formGrupUsers.reset();
          this.modalService.dismissAll();
          this.userService.saveStatus(true)
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

  get f() {
    return this.formGrupUsers;
  }
  setIdit() {
    this.formGrupUsers?.setValue({
      nombre: this.dataForm?.nombre,
      apellidos: this.dataForm?.apellidos,
      area: this.dataForm?.area,
      rol: this.dataForm?.rol,
    })
  }
}
