import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormUsersComponent } from 'src/app/component/users/form-users/form-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  private modalService = inject(NgbModal);
  constructor(
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  open() {
    const modalRef = this.modalService.open(FormUsersComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.titulo = 'Crear Usuario';
  }
  isUpdate (event: any) {
    const modalRef = this.modalService.open(FormUsersComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.titulo = "Actualizar Usuario";
    modalRef.componentInstance.dataForm  = event?.data as any;
    modalRef.componentInstance.usuarioId = event?.data?.usuarioId
  }
}
