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
  codigoTemp: Number;
  editando = false;
  alerta = false;
  constructor(public _mensajeriaService: MensajeriaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this._mensajeriaService.getClient(id).subscribe((resp: any) => {
        this.client = resp.client;
      });
    }
  }

  async guardar(form: NgForm) {

    if (form.invalid) {
      Swal.fire(
        'Error',
        'Formulario no válido',
        'error'
      )
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    await new Promise((resolve) => {
      this._mensajeriaService.findClient(this.client.nationalId).subscribe((resp: any) => {
        this.existe = resp.ok;
        if (this.existe) {
          this.codigoTemp = resp.client.nationalId;
        }
        resolve(this.existe);
      });
    });
    if (this.client.id) {
      this.editando = this.client.nationalId === this.codigoTemp;
      if (this.existe) {
        if (this.editando) {
          console.log('entró a editar');
          this._mensajeriaService.updateClient(this.client).subscribe(() => {
            this.client.updatedAt = new Date();
            console.log(this.client);
            Swal.fire({
              title: this.client.name,
              text: 'Actualizado correctamente!!',
              icon: 'success'
            });
          }, error => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error'
            })
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El nationalId debe de ser único',
            icon: 'error'
          })
          this.alerta = true;
        }
      }else {
        console.log('entró al else');
        this._mensajeriaService.updateClient(this.client).subscribe(() => {
          this.client.updatedAt = new Date();
          Swal.fire({
            title: this.client.name,
            text: 'Actualizado correctamente!!',
            icon: 'success'
          });
        })
      }
    } else if (!this.existe) {
      this._mensajeriaService.createClient(this.client).subscribe(resp => {
        Swal.fire({
          title: this.client.name,
          text: 'Creado correctamente!!',
          icon: 'success'
        });
      });
      form.reset();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El nationalId debe de ser único',
        icon: 'error'
      });
      this.alerta = true;
    }
  }
}
