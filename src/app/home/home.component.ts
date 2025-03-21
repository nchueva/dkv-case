import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { DefaultService } from '../core/api/v1';
import { AsyncPipe, NgFor } from '@angular/common';
import { Vehicle } from '../models/vehicles';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  carsService = inject(DefaultService);
  cars$ = this.carsService.getVehicles().pipe(
    tap((cars: Vehicle[]) => {
      console.log('cars', cars);
      const fullView = cars.filter((car) => car.color || car.mileage);
      console.log(fullView);
    })
  );
}
