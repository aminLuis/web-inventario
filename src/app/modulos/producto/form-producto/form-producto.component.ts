import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss']
})
export class FormProductoComponent implements OnInit {

  maxDate: Date = new Date();
  formProducto: FormGroup;

  constructor(private form:FormBuilder, 
    private productoService: ProductoServiceService
    ){

    this.formProducto = form.group({
      nombre:['',Validators.compose([Validators.required])],
      cantidad:['',Validators.compose([Validators.required])],
      fechaIngreso:['',Validators.compose([Validators.required])]
    });

  }

  ngOnInit(): void {
   
  }

  saveProducto(){
    if(this.formProducto.valid){
      this.productoService.saveProducto(this.formProducto.value).subscribe(res=>{
        alert('Producto registrado !!')
        console.log(res);
      });
    }
  }

}
