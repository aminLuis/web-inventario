import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export default class ProductoComponent implements OnInit{

  constructor(private productoService:ProductoServiceService){}

  ngOnInit(): void {
      this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos().subscribe(res=>{
      console.log('Productos: ',res);
    });
  }

}
