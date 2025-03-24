import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Vehicle } from '../models/vehicles';
import { AsyncPipe } from '@angular/common';
import { DefaultService } from '../core/api/v1';

@Component({
  selector: 'vehicle',
  imports: [AsyncPipe],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})
export class VehicleComponent {
  private readonly activateRout = inject(ActivatedRoute);
  private readonly carsService = inject(DefaultService);

  vehicle$: Observable<Vehicle | undefined>;
  loading = signal(false);

  constructor() {
    this.vehicle$ = this.activateRout.queryParams.pipe(
      tap(() => {
        this.loading.set(true);
      }),
      map((params: Params) => params['carId']),
      switchMap((carId: string) => this.carsService.getVehicleById(carId)),
      tap(() => this.loading.set(false)),
      catchError((err) => {
        console.error('An error occurred:', err);
        return of(undefined);
      })
    );
  }
}
