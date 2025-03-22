import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Vehicle } from '../models/vehicles';
import { AsyncPipe } from '@angular/common';
import { DefaultService } from '../core/api/v1';

@Component({
  selector: 'app-vehicle',
  imports: [AsyncPipe],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})
export class VehicleComponent implements OnInit {
  private readonly activateRout = inject(ActivatedRoute);
  private readonly carsService = inject(DefaultService);

  car$: Observable<Vehicle> | undefined;

  ngOnInit(): void {
    this.car$ = this.activateRout.queryParams.pipe(
      map((params: Params) => {
        console.log(params['carId'], typeof params['carId']);
        return params['carId'];
      }),
      switchMap((carId: string) => this.carsService.getVehicleById(carId))
    );
  }
}
