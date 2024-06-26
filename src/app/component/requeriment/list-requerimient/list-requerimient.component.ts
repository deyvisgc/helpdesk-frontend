import { Component, EventEmitter, Output } from '@angular/core';
import { Requirement } from 'src/app/core/interface/requiriments';
import { NotificationService } from 'src/app/core/service/notification.service';
import { RequirementService } from 'src/app/core/service/requerimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-requerimient',
  templateUrl: './list-requerimient.component.html',
  styleUrls: ['./list-requerimient.component.scss']
})
export class ListRequerimientComponent {
 @Output() update: EventEmitter<Object> = new EventEmitter<Object>();
  textSearch: string = ''
  list: Requirement[] = []
  constructor(private requerimentService: RequirementService,    private totastService: NotificationService) {
  }
  ngOnInit(): void {
    this.listar();
    this.obserbableOpertator()
  }
  listar() {
    this.requerimentService.get()
    .subscribe({
      next: (res: Requirement[]) => {
        this.list = res
      },
      error:(error: any) => {
        console.log("Error: ", error)
      }
    })
  
  }
  edit(id: number) {
    this.requerimentService.getById(id).subscribe({
      next: (res: Requirement) => {
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
  asignarAnalista (item: Requirement) {
    const response  = {
      opcion: 'asignar',
      data: item
    }
    this.update.emit(response)
  }
  obserbableOpertator() {
    this.requerimentService.isRegisterOrUpdate$.subscribe({
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
        title: 'Seguro de Eliminar Este Requerimiento?',
        text: `¡No podrás revertir esto!`,
        icon: 'warning',
        confirmButtonText: `Si, Eliminar!`,
        cancelButtonText: 'No, cerrar!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.requerimentService.delete(id).subscribe({
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
