import { Component, OnInit } from '@angular/core';
import {ActorService} from '../Servicios/actor.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  datosFactura: {nombre: string, apellido: string, direccion: string, correo: string};
  listaItems = [];
  items: number;
  total: number;

  constructor(private _actorServicio: ActorService, private httpClient: HttpClient) { }

  ngOnInit() {
    this._actorServicio.mensajeActual3.subscribe(mensaje => this.listaItems = mensaje);
    this._actorServicio.mensajeActual4.subscribe(mensaje => this.datosFactura = mensaje);
    this.items = this.listaItems.length;
    this.calcularTotal();
  }

  eliminarItem(arregloIds, idpelicula) {

    this.total -= parseFloat(this.listaItems[arregloIds].precio);
    this.listaItems.splice(arregloIds, 1);
    this.cambiarEstado(idpelicula);
    this.mandarDatos();
  }

  mandarDatos() {
    this._actorServicio.cambiarMensaje3(this.listaItems);
  }

  private calcularTotal() {
    this.total = this.listaItems.reduce((acumulador, actual) => {
      acumulador += parseFloat(actual.precio);
      return acumulador;
    }, 0);
  }

  cambiarEstado(id) {
    this.httpClient.put(`http://localhost:1337/pelicula/${id}`, {

      estado : true

    }).subscribe(
      res => {
      }
    );
  }

  completarOrden() {

    for (let i = 0; i < this.listaItems.length; i++) {
      this.cambiarEstado(this.listaItems[i].id);
    }

    this.total = 0;
    this.listaItems = [];
    this.mandarDatos();
  }

}
