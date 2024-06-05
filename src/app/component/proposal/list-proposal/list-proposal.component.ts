import { Component, EventEmitter, Output } from '@angular/core';
import { Propuesta } from 'src/app/core/interface/requiriments';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ProposaltService } from 'src/app/core/service/proposal.service';
import { StatusEnum } from 'src/app/util/EstatusEnum';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-proposal',
  templateUrl: './list-proposal.component.html',
  styleUrls: ['./list-proposal.component.scss']
})
export class ListProposalComponent {
  @Output() update: EventEmitter<Object> = new EventEmitter<Object>();
  isCollapsed = true;
  textSearch: string = ''
  totalElements: number = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  list: Propuesta[] = []
  constructor(private proposaltService: ProposaltService, private totastService: NotificationService) {
  }
  ngOnInit(): void {
    this.listar();
    this.obserbableOpertator()
  }
  listar() {
    this.proposaltService.get()
    .subscribe({
      next: (res: Propuesta[]) => {
        this.list = res
      },
      error:(error: any) => {
        console.log("Error: ", error)
      }
    })
  
  }
  edit(id: number) {
    this.proposaltService.getById(id).subscribe({
      next: (res: Propuesta) => {
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
  tomarDecicion (propuestaId: number, status: string) {

    let title = status === "Autorizar" ? "Seguro de Autroizar Esta Propuesta?" : "Seguro de Rechazar Esta Propuesta?" 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: title,
        text: `¡No podrás revertir esto!`,
        icon: 'warning',
        confirmButtonText: `Si, ${status}!`,
        cancelButtonText: 'No, cerrar!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          const estado = status === "Autorizar"  ?  StatusEnum.APROBADO :  StatusEnum.RECHAZADO

          this.proposaltService.tomarDecicion(propuestaId, estado).subscribe({
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
  verEpicas (item: Propuesta) {
    const response  = {
      opcion: 'verEpica',
      data: item
    }
    this.update.emit(response)
  }
  verHistoria (item: Propuesta) {
    const response  = {
      opcion: 'verHistoria',
      data: item
    }
    this.update.emit(response)
  }
  obserbableOpertator() {
    this.proposaltService.isRegisterOrUpdate$.subscribe({
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
          this.proposaltService.delete(id).subscribe({
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
