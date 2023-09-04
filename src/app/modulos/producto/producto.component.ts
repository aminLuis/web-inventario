import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { TableProductoComponent } from './table-producto/table-producto.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TableProductoComponent
  ],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export default class ProductoComponent implements OnInit{


  constructor(private productoService:ProductoServiceService,
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
  
  }

  openForm(){
    this.dialog.open(FormProductoComponent);
  }

}
