import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../services/invoices.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Package, Item, Invoice, Track } from '../../schemas/schema';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  package = new Package;
  forma: FormGroup;
  track = new Track;
  itemsForm: FormGroup;
  id: string;
  invoice = new Invoice;
  agregar = false;
  tracks: Item[] = [];
  constructor(private _invoiceService: InvoicesService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._invoiceService.getTracks().subscribe((tracks: any) => {
      this.tracks = tracks.items;
      console.log(this.tracks);
    }, err => console.log(err));
    this.crearFormulario();
  }


  get items() {
    return this.forma.get('items') as FormArray;
  }

  createTrack(track:Track){
    this._invoiceService.createTrack(track).subscribe(resp=>{
      console.log(resp);
      Swal.fire({
        title: 'Exito!!',
        text: `Track creado correctamente`,
        icon: 'success'
      });
    },err=>{
      Swal.fire({
        title: 'Error',
        text: `Ha ocurrido un error ${err.message}`,
        icon: 'error'
      });
    })
  }

  guardar() {
    this.invoice.items = this.items.value;
    this.invoice.clientId = this.id;
    this.invoice.date = new Date();
    console.log(this.invoice);
    if (this.forma.invalid) {
      Swal.fire(
        'Error',
        'Formulario no válido',
        'error'
      )
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this._invoiceService.createInvoice(this.invoice).subscribe((resp:any)=>{
      console.log(resp);
      Swal.fire({
        title: 'Exito!!',
        text: `Factura creada correctamente`,
        icon: 'success'
      });
    }), err=>{
      Swal.fire({
        title: 'Error',
        text: `Ha ocurrido un error ${err.message}`,
        icon: 'error'
      });
    }
  }
  crearFormulario() {
    this.forma = this.fb.group({
      items: this.fb.array([])
    })
  }
  borrarPackage(i: number) {
    this.items.removeAt(i);
  }
  borrarTrack(id:string,i:number){
    this.tracks.splice(i,1);
    this._invoiceService.deleteTrack(id).subscribe(resp=>{
      console.log(resp);
      Swal.fire({
        title: 'Exito!!',
        text: `Borrado correctamente`,
        icon: 'success'
      });
    }), err=>{
      Swal.fire({
        title: 'Error',
        text: `Ha ocurrido un error ${err.message}`,
        icon: 'error'
      });
    }
  }  
  addItem() {
    this.items.push(
      this.fb.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        trackId: ['',Validators.required]
      })
    );
  }
  reload(){
    window.location.reload();
  }
}
