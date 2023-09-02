import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'producto', loadComponent: ()=> import('./modulos/producto/producto.component')},
  {path: 'usuario', loadComponent: ()=> import('./modulos/usuario/usuario.component')}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
