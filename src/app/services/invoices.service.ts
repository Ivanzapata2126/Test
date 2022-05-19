import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice, Track } from '../schemas/schema';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  URL = 'https://postgress-app-test.herokuapp.com';
  invoices:Invoice[] = [];
  constructor(private http:HttpClient) { }

  getTracks(){
    return this.http.get(`${this.URL}/packages/tracks?page=1&limit=10`);
  }

  createTrack(track:Track){
    return this.http.post(`${this.URL}/packages/tracks`,track);
  }

  deleteTrack(id:string){
    return this.http.delete(`${this.URL}/packages/tracks/${id}`);
  }
  getInvoices(){
    return this.http.get(`${this.URL}/invoices?page=1&limit=10`).subscribe((resp:any)=>{
      this.invoices = resp;
      console.log(this.invoices);
    })
  }

  createInvoice(invoice:any){
    return this.http.post(`${this.URL}/invoices`,invoice);
  }
}
