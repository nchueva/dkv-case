import { Component, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DefaultService } from '../core/api/v1';
import { AsyncPipe } from '@angular/common';
import { Vehicle } from '../models/vehicles';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  carsService = inject(DefaultService);

  cars$: Observable<Vehicle[]> = this.carsService.getVehicles().pipe(
    map((cars: Vehicle[]) => {
      return cars.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        } else if (a.name && !b.name) {
          return -1; // b.name doesn't exist, place it before b => [a,b]
        } else if (!a.name && b.name) {
          return 1; // a.name doesn't exist, place it after b => [b,a]
        } else {
          // consider them as equal
          return 0;
        }
      });
    }),
    tap((cars: Vehicle[]) => {
      console.log('cars', cars);
      const fullView = cars.filter((car) => car.color || car.mileage);
      console.log(fullView);
    })
  );
}
