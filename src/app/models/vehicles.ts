type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

import { AddVehicle201Response, AddVehicleRequest } from '../core/api/v1';

export type Vehicle = AddVehicle201Response;
export type VehicleForm = AddVehicleRequest;
