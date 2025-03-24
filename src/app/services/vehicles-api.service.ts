import { inject, Injectable } from '@angular/core';
import { Vehicle, VehicleForm } from '../models/vehicles';
import { DefaultService } from '../core/api/v1';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  take,
} from 'rxjs';

function sortCarsAsc(vehicles: Vehicle[]) {
  return vehicles.sort((a, b) => {
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
  private readonly vehicleService = inject(DefaultService);
  private readonly updateVehicles$$ = new BehaviorSubject<void>(undefined);

  getVehicles(): Observable<Vehicle[]> {
    return this.updateVehicles$$.pipe(
      switchMap(() => this.vehicleService.getVehicles()),
      map((vehicles: Vehicle[]) => {
        return sortCarsAsc(vehicles);
      }),
      catchError((err) => {
        console.error('There is an error in getVehicles:', err);
        return [];
      })
    );
  }

  addNewVehicle(newVehicle: VehicleForm): Observable<Vehicle> {
    return this.vehicleService.addVehicle(newVehicle).pipe(take(1));
  }

  refreshVehicles(): void {
    this.updateVehicles$$.next();
  }
}
