import { Component, inject, OnInit } from '@angular/core';
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
export class VehicleComponent implements OnInit {
  private readonly activateRout = inject(ActivatedRoute);
  private readonly carsService = inject(DefaultService);

  car$: Observable<Vehicle | undefined> | undefined;
  loading = false;

  ngOnInit(): void {
    this.car$ = this.activateRout.queryParams.pipe(
      tap(() => {
        this.loading = true;
      }),
      map((params: Params) => params['carId']),
      switchMap((carId: string) => this.carsService.getVehicleById(carId)),
      tap(() => (this.loading = false)),
      catchError((err) => {
        return of(undefined);
      })
    );
  }
}
