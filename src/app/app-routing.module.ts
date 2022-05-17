import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';


const routes: Routes = [
  {path:'clientes',component:ClientsComponent},
  {path:'cliente/:id',component:ClientComponent},
  {path:'**',pathMatch:'full',redirectTo:'clientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
