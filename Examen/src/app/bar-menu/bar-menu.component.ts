import { Component, OnInit } from '@angular/core';
import {ActorService} from '../Servicios/actor.service';

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent implements OnInit {

  items: any;

  constructor(private _actorServicio: ActorService) {
    this._actorServicio.mensajeActual3.subscribe(mensaje => this.items = mensaje);
  }

  ngOnInit() {
  }

}
