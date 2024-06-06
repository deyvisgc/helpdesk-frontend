import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/core/interface/requiriments';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  @Output() update: EventEmitter<Object> = new EventEmitter<Object>();
  isCollapsed = true;
  textSearch: string = ''
  list: Usuario[] = []
  constructor(private usuarioService: UsuarioService, private totastService: NotificationService) {
  }
  ngOnInit(): void {
    this.listar();
    this.obserbableOpertator()
  }
  listar() {
    this.usuarioService.get()
    .subscribe({
      next: (res: Usuario[]) => {
        this.list = res
      },
      error:(error: any) => {
        console.log("Error: ", error)
      }
    })
  
  }
  edit(id: number) {
    this.usuarioService.getById(id).subscribe({
      next: (res: Usuario) => {
        const response  = {
          opcion: 'edit',
          data: res
        }
        this.update.emit(response)
      },
      error: (err: any) => {
        this.totastService.error(err?.error?.error);
      },
    });
  }
  obserbableOpertator() {
    this.usuarioService.isRegisterOrUpdate$.subscribe({
      next: (res: boolean) => {
        if (res) this.listar();
      }
    })
  }
  eliminar(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Seguro de Eliminar Este Usuario?',
        text: `¡No podrás revertir esto!`,
        icon: 'warning',
        confirmButtonText: `Si, Eliminar!`,
        cancelButtonText: 'No, cerrar!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.usuarioService.delete(id).subscribe({
            next: (res: any) => {
              this.totastService.success(res?.message);
            },
            error: (err: any) => {
              this.totastService.error(err?.error);
            },
            complete: () => {
              this.listar();
            },
          });
        }
      });
  }
}
