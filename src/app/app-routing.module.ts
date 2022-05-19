import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SeeInvoicesComponent } from './pages/see-invoices/see-invoices.component';


const routes: Routes = [
  {path:'clientes',component:ClientsComponent},
  {path:'cliente/:id',component:ClientComponent},
  {path:'facturas/:id',component:SeeInvoicesComponent},
  {path:'facturas/nueva/:id',component:InvoicesComponent},
  {path:'**',pathMatch:'full',redirectTo:'clientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
