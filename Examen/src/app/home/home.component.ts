import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActorService} from '../Servicios/actor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buscar = '';
  Actores = [];
  Peliculas = [];

  constructor(private httpClient: HttpClient, private httpClient2: HttpClient, private _actorServicio: ActorService) {
  }

  ngOnInit() {

    this._actorServicio.mensajeActual.subscribe(mensaje => this.Actores = mensaje);
    this._actorServicio.mensajeActual2.subscribe(mensaje => this.Peliculas = mensaje);
    this.ocultarElementos();

  }

  onNameKeyUp(event: any) {
    this.buscar = event.target.value;
  }

  getProfile() {
    this.httpClient.get(`http://localhost:1337/Actor?nombres=${this.buscar}`).subscribe((data: any[]) => {
        this.Actores = data;
      }
    );

    this.httpClient2.get(`http://localhost:1337/Pelicula?nombre=${this.buscar}`).subscribe((data: any[]) => {
        this.Peliculas = data;
      }
    );

    this.mandarDatos();
    this.mostrarElementos();
  }

  mandarDatos() {

    this._actorServicio.cambiarMensaje(this.Actores);
    this._actorServicio.cambiarMensaje2(this.Peliculas);
  }

  mostrarElementos() {

    const mostrarLabelDesarrolladora = <HTMLFormElement>document.getElementById('tituloDesa');
    mostrarLabelDesarrolladora.style.display = 'block';

    const mostrarLabelJuego = <HTMLFormElement>document.getElementById('tituloJuego');
    mostrarLabelJuego.style.display = 'block';

  }

  ocultarElementos() {

    const mostrarLabelDesarrolladora = <HTMLFormElement>document.getElementById('tituloDesa');
    mostrarLabelDesarrolladora.style.display = 'none';

    const mostrarLabelJuego = <HTMLFormElement>document.getElementById('tituloJuego');
    mostrarLabelJuego.style.display = 'none';

  }

}
