import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/schemas/schema';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import Swal from 'sweetalert2';
import { Client } from '../../schemas/schema';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[] = [];
  constructor(public _mensajeriaService:MensajeriaService){}
  ngOnInit(): void {
    this._mensajeriaService.getClients();
  }

  deleteClients(id:string,i:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Borrarás a un cliente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0BD45E',
      confirmButtonText: `Sí, estoy seguro!`
    }).then((result) => {
      if (result.isConfirmed) {
          this._mensajeriaService.clients.splice(i,1);
          this._mensajeriaService.deleteClient(id).subscribe();
      }
    })
  }
}
