import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VehicleComponent } from './vehicle/vehicle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: '404-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
