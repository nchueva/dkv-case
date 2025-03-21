type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

import { AddVehicle201Response } from '../core/api/v1';

// export type Vehicle = Required<
//   Omit<AddVehicle201Response, 'color' | 'mileage'>
// > & {
//   color?: string | null;
//   mileage?: number | null;
// };

export type Vehicle = AddVehicle201Response;
