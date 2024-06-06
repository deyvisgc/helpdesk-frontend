import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';
import { ResponseMessage } from '../interface/message.response';
import { Requirement } from '../interface/requiriments';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  isRegisterOrUpdate$: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) { }
  getById(id: number): Observable<Requirement> {
    return this.http.get<Requirement>(UriConstante.REQUERIMENT_RESOURCE + `/${id}`);
  }
  register(datosJson: string, file: File): Observable<ResponseMessage> {
    const formData: FormData = new FormData();
    formData.append('datos', datosJson);
    formData.append('file', file);

    return this.http.post<ResponseMessage>(UriConstante.REQUERIMENT_RESOURCE, formData);
  }

  update(idRequerimiento: string, idUsuario: string, datosJson: string, file: File | null): Observable<ResponseMessage> {
    const formData: FormData = new FormData();
    formData.append('datos', datosJson);
    formData.append('file', file ? file : '');
    formData.append('idUsuario', idUsuario);
    formData.append('idRequerimiento', idRequerimiento);

    return this.http.put<ResponseMessage>(
      `${UriConstante.REQUERIMENT_RESOURCE}`,
      formData
    );
  }
  asignar(idRequerimiento: number, asignadoId: number): Observable<ResponseMessage> {
    const params = new HttpParams()
      .set("requirementId", idRequerimiento.toString())
      .set("asignadoId", asignadoId.toString());
    // Realizar la solicitud PUT con los parámetros en la URL
    return this.http.put<ResponseMessage>(
      `${UriConstante.REQUERIMENT_RESOURCE}/assign-analyst`, null, { params: params }
    );
  }
  delete(id: number) {
    return this.http.delete<ResponseMessage>(UriConstante.REQUERIMENT_RESOURCE + `/${id}`);
  }
  saveStatus(status: boolean) {
    this.isRegisterOrUpdate$.next(status);
  }
  get(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(UriConstante.REQUERIMENT_RESOURCE);
  }
  getRequerimentByAnlyt(id: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(UriConstante.REQUERIMENT_RESOURCE + `/analista/${id}`);
  }
  getTotales() {
    return this.http.get<Requirement[]>(UriConstante.REQUERIMENT_RESOURCE + `/report`);

  }

}
