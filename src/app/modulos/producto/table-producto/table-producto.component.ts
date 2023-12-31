import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { Producto } from 'src/app/interfaces/producto';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import Swal from 'sweetalert2';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-table-producto',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './table-producto.component.html',
  styleUrls: ['./table-producto.component.scss']
})
export class TableProductoComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['nombre', 'cantidad', 'fechaIngreso', 'acciones'];
  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productos: Producto[]=[];
  subscription: any;
  dataSend!: Producto;

  constructor(private productoService:ProductoServiceService,
    private dialog: MatDialog
    ){
    this.dataSource = new MatTableDataSource(this.productos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
      this.getProductos();
      this.subscription = this.productoService.reload.subscribe(()=>{
        this.getProductos();
      });
  }

  getProductos(){
    this.productoService.getProductos().subscribe(res=>{
      this.productos = res;
      this.dataSource = new MatTableDataSource(this.productos);
      
    });
  }

  selectProducto(producto:Producto){
    this.dataSend = producto;
  }

  openFormEdit(){
    this.dialog.open(EditComponent,{
      data: this.dataSend
    });
  }

  deleteProducto(id:string){

    Swal.fire({
      title: '¿Seguro que desea eliminar el registro?',
      text: "Será eliminado de forma permanente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.deleteProducto(id).subscribe(res=>{
        });

        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}