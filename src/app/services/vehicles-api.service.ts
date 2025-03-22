import { inject, Injectable } from '@angular/core';
import { Vehicle, VehicleForm } from '../models/vehicles';
import { DefaultService } from '../core/api/v1';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';

function sortCarsAsc(cars: Vehicle[]) {
  return cars.sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    } else if (a.name && !b.name) {
      return -1; // place a before b => [a,b]
    } else if (!a.name && b.name) {
      return 1; // place b before a => [b,a]
    }
    return 0; // both don't exist, consider them as equal
  });
}

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService {
  private readonly carsService = inject(DefaultService);
  private readonly updateVehicles$$ = new BehaviorSubject<void>(undefined);

  getVehicles(): Observable<Vehicle[]> {
    return this.updateVehicles$$.pipe(
      switchMap(() => this.carsService.getVehicles()),
      map((cars: Vehicle[]) => {
        return sortCarsAsc(cars);
      })
    );
  }

  addNewVehicle(newVehicle: VehicleForm): Observable<Vehicle> {
    return this.carsService.addVehicle(newVehicle).pipe(take(1));
  }

  refreshVehicles(): void {
    this.updateVehicles$$.next();
  }
}
