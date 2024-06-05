import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';
import { ResponseMessage } from '../interface/message.response';
import { Propuesta } from '../interface/requiriments';
import { StatusEnum } from 'src/app/util/EstatusEnum';

@Injectable({
  providedIn: 'root',
})
export class ProposaltService {
   isRegisterOrUpdate$: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<Propuesta> {
    return this.http.get<Propuesta>(UriConstante.PROPUESTA_RESOURCE + `/${id}`);
  }
  register(propuesta: Propuesta): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(UriConstante.PROPUESTA_RESOURCE, propuesta);
  }

  update(idRequerimiento: string, idUsuario: string, datosJson: string, file: File | null): Observable<ResponseMessage> {
    const formData: FormData = new FormData();
    formData.append('datos', datosJson);
    formData.append('file', file ? file : '');
    formData.append('idUsuario', idUsuario);
    formData.append('idRequerimiento', idRequerimiento);

    return this.http.put<ResponseMessage>(
      `${UriConstante.PROPUESTA_RESOURCE}`,
      formData
    );
  }
  delete(id: number) {
    return this.http.delete<ResponseMessage>(UriConstante.PROPUESTA_RESOURCE + `/${id}`);
  }
  saveStatus(status: boolean) {
    this.isRegisterOrUpdate$.next(status);
  }
  get(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>(UriConstante.PROPUESTA_RESOURCE );
  }
  tomarDecicion(idPropuesta: number, status: StatusEnum): Observable<ResponseMessage> {
    const params = new HttpParams()
      .set("propuestaId", idPropuesta.toString())
      .set("estado", status);
    return this.http.put<ResponseMessage>(
      `${UriConstante.PROPUESTA_RESOURCE}/tomar-decision`, null, { params: params }
    );
  }
  
}
