import {
  AddVehicle201Response,
  AddVehicleRequest,
  GetVehicles200ResponseInner,
} from '../core/api/v1';

export type Vehicle = AddVehicle201Response | GetVehicles200ResponseInner;
export type VehicleForm = AddVehicleRequest;
