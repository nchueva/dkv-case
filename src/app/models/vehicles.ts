type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

import { AddVehicle201Response } from '../core/api/v1';

export interface Vehicle extends AddVehicle201Response {
  color?: string | null;
  mileage?: number | null;
}
