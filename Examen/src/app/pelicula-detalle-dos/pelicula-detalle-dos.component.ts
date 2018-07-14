import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ActorService} from '../Servicios/actor.service';

@Component({
  selector: 'app-pelicula-detalle-dos',
  templateUrl: './pelicula-detalle-dos.component.html',
  styleUrls: ['./pelicula-detalle-dos.component.css']
})
export class PeliculaDetalleDosComponent implements OnInit {

  peliculaDetalle = {
    nombre: '',
    anioLanzamiento: '',
    rating: '',
    actoresPrincipales: '',
    sinopsis: '',
    imagen: '',
    precio: '',
    estado: '',
    id: ''
  };

  estadoUno = '';
  estadoIni: any;
  arregloCarrito = [];

  constructor(private httpClient: HttpClient, private _activatedRoute: ActivatedRoute, private _actorServicio: ActorService) {

    this._activatedRoute.params.subscribe(params => {
      this.obtenerDatos(params['idPelicula']);
    });

  }

  ngOnInit() {
    this._actorServicio.mensajeActual3.subscribe(mensaje => this.arregloCarrito = mensaje);
  }

  obtenerDatos(id) {
    this.httpClient.get(`http://localhost:1337/pelicula?id=${id}`).subscribe((data: any[]) => {

        this.peliculaDetalle = data[0];
        this.estadoIni = this.peliculaDetalle.estado;
        this.verEstado(this.estadoIni);

      }
    );

  }

  agregarDatos(id) {

    this.cambiarEstado(id);
    this.arregloCarrito.push(this.peliculaDetalle);
    this.ocultarElementos();
    this.mandarDatos();
  }

  mandarDatos() {
    this._actorServicio.cambiarMensaje3(this.arregloCarrito);
  }

  cambiarEstado(id) {
    this.httpClient.put(`http://localhost:1337/pelicula/${id}`, {
      estado: false
    }).subscribe(
      res => {
      }
    );
  }

  ocultarElementos() {

    /*var mostrarLabelDesarrolladora = <HTMLFormElement>document.getElementById('tituloDesa');
    mostrarLabelDesarrolladora.style.display = "none";

    var mostrarLabelJuego = <HTMLFormElement>document.getElementById('tituloJuego');
    mostrarLabelJuego.style.display = "none";

    var mostrarJuegos = <HTMLFormElement>document.getElementById('disponible');
    mostrarJuegos.style.display = "none";

    var mostrarListJuegos = <HTMLFormElement>document.getElementById('listaJuegos');
    mostrarListJuegos.style.display = "none";*/

  }

  verEstado(estado) {

    console.log('estado ', estado);

    if (estado) {

      this.estadoUno = 'Disponible';
      const mostrarPeliculas = <HTMLFormElement>document.getElementById('botonAgregarCarrito');
      mostrarPeliculas.style.display = 'block';
      /*const mostrarPeliculas1 = <HTMLFormElement>document.getElementById('noDisponible');
      mostrarPeliculas1.style.display = 'none';*/

    } else {

      this.estadoUno = 'No Disponible';
      const mostrarPeliculas2 = <HTMLFormElement>document.getElementById('botonAgregarCarrito');
      mostrarPeliculas2.style.display = 'none';
      /*const mostrarPeliculas3 = <HTMLFormElement>document.getElementById('noDisponible');
      mostrarPeliculas3.style.display = 'block';*/

    }

  }

}
