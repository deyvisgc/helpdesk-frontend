import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UriConstante } from 'src/app/util/UriConstante';
import { ResponseMessage } from '../interface/message.response';
import { Usuario } from '../interface/requiriments';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
   isRegisterOrUpdate$: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(UriConstante.USUARIO_RESOURCE + `/${id}`);
  }
  register(users: Usuario): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(UriConstante.USUARIO_RESOURCE, users);
  }
  update(idUsuario: number, users: Usuario): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(
      `${UriConstante.USUARIO_RESOURCE}/${idUsuario}`,
      users
    );
  }
  delete(id: number) {
    return this.http.delete<ResponseMessage>(UriConstante.USUARIO_RESOURCE + `/${id}`);
  }
  saveStatus(status: boolean) {
    this.isRegisterOrUpdate$.next(status);
  }
  get(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(UriConstante.USUARIO_RESOURCE);
  }
  getAsignar() {
    return this.http.get<Usuario[]>(UriConstante.USUARIO_RESOURCE + "/it-analyst");
  }
  
}
