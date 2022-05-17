import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajeriaService } from '../../services/mensajeria.service';
import { Client } from '../../schemas/schema';
import { AnyForUntypedForms, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client = new Client;
  existe = false;
  codigoTemp:string;
  constructor(public _mensajeriaService:MensajeriaService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this._mensajeriaService.getClient(id).subscribe((resp:Client)=>{
        this.client=resp;
        this.client.id = id;
      });
    }
  }

  async guardar(form:NgForm){
    
    if(form.invalid){
      Swal.fire(
        'Error',
        'Formulario no válido',
        'error'
        )
      return;
    }
    Swal.fire({
      title:'Espere',
      text:'Guardando información...',
      icon:'info',
      allowOutsideClick:false
    });
    Swal.showLoading();
    await new Promise((resolve, reject)=>{
      this._mensajeriaService.findClient(this.client.nationalId).subscribe((resp:any)=>{
          console.log(resp);
          this.existe = resp.ok;
          if(this.existe){
            this.codigoTemp = resp.client.id;
          }
          resolve(this.existe);
        });
    });
    if(this.client.id){
      if(!this.existe){
        Swal.fire({
          title: 'Error',
          text: 'El nationalId debe de ser único',
          icon:'error'
        })
      }else{
        this._mensajeriaService.updateClient(this.client).subscribe(resp=>{
        this.client.updatedAt = new Date();
        Swal.fire({
          title:this.client.name,
          text: 'Actualizado correctamente!!',
          icon:'success'
        });
        },error=>{
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon:'error'
          })
        });
      }
    }
    if(this.existe){
      Swal.fire({
        title: 'Error',
        text: 'El nationalId debe de ser único',
        icon:'error'
      });
    }else{
      console.log(this.existe);
      this._mensajeriaService.createClient(this.client).subscribe(resp=>{
        Swal.fire({
          title:this.client.name,
          text: 'Creado correctamente!!',
          icon:'success'
        });
      });
      form.reset();
    }
  }
}
