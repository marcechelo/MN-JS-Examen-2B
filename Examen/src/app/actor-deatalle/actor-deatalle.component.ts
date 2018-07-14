import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-actor-deatalle',
  templateUrl: './actor-deatalle.component.html',
  styleUrls: ['./actor-deatalle.component.css']
})
export class ActorDeatalleComponent implements OnInit {

  actorDetalle: any;
  datosHijos: any;
  retirado = '';

  constructor(private _activatedRoute: ActivatedRoute, private httpClient: HttpClient ) {

    this._activatedRoute.params.subscribe(params => {
      this.obtenerDatos(params['id']);
    });

  }

  ngOnInit() {
  }

  obtenerDatos(id) {
    this.httpClient.get(`http://localhost:1337/Actor?id=${id}`).subscribe((data: any[]) => {
          this.actorDetalle = data;
          this.datosHijos = data[0].peliculas;

        if (this.actorDetalle[0].retirado === true) {
          this.retirado = 'Si';
        } else {
          this.retirado = 'No';
        }

        }
      );

  }

}
