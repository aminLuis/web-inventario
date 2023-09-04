import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss']
})
export class FormProductoComponent implements OnInit {

  maxDate: Date = new Date();
  formProducto: FormGroup;
  usuarios: Usuario[]=[];

  constructor(private form:FormBuilder, 
    private productoService: ProductoServiceService,
    private usuarioService: UsuarioServiceService,
    private dialog: MatDialog
    ){

    this.formProducto = form.group({
      nombre:['',Validators.compose([Validators.required])],
      cantidad:['',Validators.compose([Validators.required])],
      fechaIngreso:['',Validators.compose([Validators.required])],
      idUsuario:['',Validators.compose([Validators.required])]
    });

  }

  ngOnInit(): void {
   this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(res=>{
      this.usuarios = res;
      console.log(this.usuarios);
    });
  }

  saveProducto(){
    if(this.formProducto.valid){
      console.log('FORM: ',this.formProducto.value);
      this.productoService.saveProducto(this.formProducto.value).subscribe(res=>{
       if(res.id!=null){
        this.messageSuccess('Producto creado con exito !!');
        this.formProducto.reset();
        this.closeModal();
       }else{
        this.messageError('Error al registrar producto !!');
       }
      });
    }
  }

  closeModal(){
    this.dialog.closeAll();
  }

  messageSuccess(mensaje:string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

  messageError(mensaje:string){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

}
