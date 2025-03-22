import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ErrorHandler, inject } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // {
  //   path: 'vehicle',
  //   redirectTo: ({ queryParams }) => {
  //     const errorHandler = inject(ErrorHandler);
  //     const carId = queryParams['carId'];
  //     if (carId !== undefined) {
  //       return `/vehicle/${carId}`;
  //     } else {
  //       errorHandler.handleError(
  //         new Error('Attempted navigation to car page without car ID.')
  //       );
  //       return `404-not-found`;
  //     }
  //   },
  // },
  { path: 'vehicle', component: VehicleComponent },
  { path: '404-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
