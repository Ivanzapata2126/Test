import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { Client, Resultado, Item } from '../schemas/schema';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  URL = 'https://postgress-app-test.herokuapp.com';
  resp = '';
  existe = false;
  clients:Client[] = [];
  constructor(private http:HttpClient) {
  }

  getClients(){
    return this.http.get(`${this.URL}/clients?page=1&limit=20`).subscribe((resp:any)=>{
      this.clients = resp.items;
    })
  }

  getClient(id:string){
    return this.http.get(`${this.URL}/clients/${id}`);
  }

  deleteClient(id:string){
    return this.http.delete(`${this.URL}/clients/${id}`);
  }

  createClient(client:Client){
    return this.http.post(`${this.URL}/clients`,client).pipe(
      map((resp:any)=>{
        this.resp = resp.message;
        client.id = resp.id;
        return client;
      })
    );
  }

  updateClient(client:Client){
    const clientTemp = {
      ...client
    };
    delete clientTemp.id;
    return this.http.patch(`${this.URL}/clients/${client.id}`,clientTemp);
  }

  findClient(id:number){
    return this.http.get(`${this.URL}/clients/${id}`);
  }
}
