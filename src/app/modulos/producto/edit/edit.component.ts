import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  maxDate: Date = new Date();
  formProducto: FormGroup;
  producto!: Producto;

  constructor( @Inject(MAT_DIALOG_DATA) public data: Producto,
  private form:FormBuilder,
  private productoService: ProductoServiceService
  ){
    this.producto = this.data;
    console.log(this.producto)
    this.formProducto = form.group({
      nombre:['',Validators.compose([Validators.required])],
      cantidad:['',Validators.compose([Validators.required])],
      fechaIngreso:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
     
  }

  updateProducto(){
    if(this.formProducto.valid){
      this.productoService.updateProducto(this.producto).subscribe(res=>{
        alert('Producto actualizado !!');
        console.log(res);
      });
    }
  }

}
