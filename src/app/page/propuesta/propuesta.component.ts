import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormProposalComponent } from 'src/app/component/proposal/form-proposal/form-proposal.component';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.scss']
})
export class PropuestaComponent {
  private modalService = inject(NgbModal);
  constructor(
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  open() {
    const modalRef = this.modalService.open(FormProposalComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xl'});
    modalRef.componentInstance.titulo = 'Crear Propuesta';
  }
  isUpdate (event: any) {
    const modalRef = this.modalService.open(FormProposalComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.titulo = "Actualizar Requerimiento";

    if (event?.opcion === 'verEpica') {
      modalRef.componentInstance.titulo = "Listado de Epica"
      modalRef.componentInstance.verEpica = true;
    }
    if (event?.opcion === 'verHistoria') {
      modalRef.componentInstance.titulo = "Listado de Historias de Usuario"
      modalRef.componentInstance.verHistoria = true;
    }
    modalRef.componentInstance.dataForm  = event?.data as any;

  }
}
