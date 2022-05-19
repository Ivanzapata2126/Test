import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SeeInvoicesComponent } from './pages/see-invoices/see-invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientComponent,
    InvoicesComponent,
    SeeInvoicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
