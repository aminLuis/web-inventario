import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/enviroments/environments';

const apiProducto = environment.apiProducto;

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private refresh = new Subject<void>();

  get reload(){
    return this.refresh;
  }

  constructor(private http:HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(apiProducto+"/getAll")
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  getProducto(id:string):Observable<Producto>{
    return this.http.get<Producto>(apiProducto+"/getById/"+id)
    .pipe(
      catchError(err=>{
        console.log(err);
        return throwError(err);
      })
    );
  }

  saveProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(apiProducto+"/save",producto)
    .pipe(
      tap(()=>{
        this.refresh.next();
      }),
      catchError(error=>{
        console.log(error);
        return throwError(error);
      })
    );
  }

  updateProducto(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(apiProducto+"/update/"+producto.id, producto)
    .pipe(
      tap(()=>{
        this.refresh.next();
      }),
      catchError(error=>{
        console.log(error);
        return throwError(error);
      })
    );
  }

  deleteProducto(id:string):Observable<{}>{
    return this.http.delete<{}>(apiProducto+"/delete/"+id)
    .pipe(
      tap(()=>{
        this.refresh.next();
      }),
      catchError(error=>{
        console.log(error);
        return throwError(error);
      })
    );
  }

}
