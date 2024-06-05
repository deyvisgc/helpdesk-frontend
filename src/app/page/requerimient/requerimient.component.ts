import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormRequerimientComponent } from 'src/app/component/requeriment/form-requerimient/form-requerimient.component';

@Component({
  selector: 'app-requerimient',
  templateUrl: './requerimient.component.html',
  styleUrls: ['./requerimient.component.scss']
})
export class RequerimientComponent {
  private modalService = inject(NgbModal);
  constructor(
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  open() {
    const modalRef = this.modalService.open(FormRequerimientComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.titulo = 'Crear Requerimiento';
  }
  isUpdate (event: any) {
    const modalRef = this.modalService.open(FormRequerimientComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.titulo = "Actualizar Requerimiento";

    if (event?.opcion === 'asignar') {
      modalRef.componentInstance.titulo = "Asignar requerimiento"
      modalRef.componentInstance.isAsigna = true;
    }
    modalRef.componentInstance.dataForm  = event?.data as any;
    modalRef.componentInstance.idRequerimiento = event?.data?.requerimiento_id
  }
}
