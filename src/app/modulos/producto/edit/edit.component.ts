import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuditoriProductoService } from 'src/app/services/auditori-producto.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  maxDate: Date = new Date();
  formProducto: FormGroup;
  formAuditoria: FormGroup;
  producto!: Producto;
  usuarios: Usuario[]=[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: Producto,
  private form:FormBuilder,
  private productoService: ProductoServiceService,
  private usuarioService: UsuarioServiceService,
  private dialog: MatDialog,
  private auditoriaProducto: AuditoriProductoService
  ){
    this.producto = this.data;
    console.log(this.producto)
    this.formProducto = form.group({
      nombre:['',Validators.compose([Validators.required])],
      cantidad:['',Validators.compose([Validators.required])],
      fechaIngreso:['',Validators.compose([Validators.required])],
      idUsuario:['',Validators.required]
    });

    this.formAuditoria = form.group({
      idUsuario:[''],
      fechaEdit:[''],
      idProducto:['']
    });

  }

  ngOnInit(): void {
     this.getUsuarios();
  }

  updateProducto(){
    if(this.formProducto.valid){
      this.productoService.updateProducto(this.producto).subscribe(res=>{
       this.messageSuccess('Producto actualizado !!');
        
        this.formAuditoria.value['idUsuario'] = this.formProducto.value['idUsuario'];
        this.formAuditoria.value['fechaEdit'] = this.maxDate;
        this.formAuditoria.value['idProducto'] = res.id;

        this.auditoriaProducto.saveAuditoriaProducto(this.formAuditoria.value).subscribe(res=>{
          console.log('Res auditoria: ',res)
        });
        this.closeModal();
      });
    }
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(res=>{
      this.usuarios = res;
      console.log(this.usuarios);
    });
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
