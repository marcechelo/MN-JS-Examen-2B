import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CarritoComponent} from './carrito/carrito.component';
import {PeliculaComponent} from './pelicula/pelicula.component';
import {ActorComponent} from './actor/actor.component';

export const RUTAS: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'carrito',
    component: CarritoComponent,
  },

  {
    path: 'actor/:id/pelicula/:idPelicula',
    component: PeliculaComponent
  },
  {
    path: 'actor/:id',
    component: ActorComponent,
    children:
      [{

        path: 'pelicula/:idPelicula',
        component: PeliculaComponent

      }]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
