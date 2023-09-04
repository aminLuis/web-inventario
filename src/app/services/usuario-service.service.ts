import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environments';

const apiUsuario = environment.apiUsuario;

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(apiUsuario+"/getAll")
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  getUsuario(id:string):Observable<Usuario>{
    return this.http.get<Usuario>(apiUsuario+"/getById/"+id)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

}
