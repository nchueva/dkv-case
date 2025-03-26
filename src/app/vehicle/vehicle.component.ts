import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Vehicle } from '../models/vehicles';
import { AsyncPipe } from '@angular/common';
import { VehiclesApiService } from '../services/vehicles-api.service';

@Component({
  selector: 'vehicle',
  imports: [AsyncPipe],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleComponent {
  private readonly activateRout = inject(ActivatedRoute);
  private readonly vehiclesApiService = inject(VehiclesApiService);

  vehicle$: Observable<Vehicle | undefined>;
  private loadingSignal = signal(false);
  loading = this.loadingSignal.asReadonly();

  constructor() {
    this.vehicle$ = this.activateRout.queryParams.pipe(
      tap(() => {
        this.loadingSignal.set(true);
      }),
      map((params: Params) => params['carId']),
      switchMap((carId: string) =>
        this.vehiclesApiService.getVehicleById(carId)
      ),
      tap(() => this.loadingSignal.set(false)),
      catchError((err) => {
        console.error('An error occurred:', err);
        return of(undefined);
      })
    );
  }
}
