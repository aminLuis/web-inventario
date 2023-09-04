import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environments';
import { AuditoriaProducto } from '../interfaces/auditoriaProdcuto';

const apiAuditoria = environment.auditoriaProducto;

@Injectable({
  providedIn: 'root'
})
export class AuditoriProductoService {

  constructor(private http:HttpClient) { }

  saveAuditoriaProducto(auditoria:AuditoriaProducto):Observable<AuditoriaProducto>{
    return this.http.post<AuditoriaProducto>(apiAuditoria+"/save",auditoria)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

}
