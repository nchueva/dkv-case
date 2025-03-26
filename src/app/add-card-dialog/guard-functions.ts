import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { VehicleForm } from '../models/vehicles';

type HasPropertyInput = Record<string, unknown> | null | undefined;
export function hasProperty<X extends HasPropertyInput, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return !!obj && prop in obj;
}

export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function hasStringKeyValue(key: string, value: object): boolean {
  return (
    isRecord(value) && hasProperty(value, key) && typeof value[key] === 'string'
  );
}

export function hasNumberKeyValue(key: string, value: object): boolean {
  return (
    isRecord(value) &&
    hasProperty(value, key) &&
    typeof value[key] === 'number' &&
    !isNaN(value[key])
  );
}

function notExist(value: unknown): boolean {
  return value === undefined || value === null;
}

export function isVehicleForm(value: unknown): value is VehicleForm {
  if (!value || !isRecord(value)) {
    return false;
  }

  const hasName = hasStringKeyValue('name', value);
  const hasModel = hasStringKeyValue('model', value);
  const hasManufacturer = hasStringKeyValue('manufacturer', value);
  const hasFuel = hasStringKeyValue('fuel', value);
  const hasType = hasStringKeyValue('type', value);
  const hasVin = hasStringKeyValue('vin', value);

  const color = value['color'];
  const hasOptionalColor = notExist(color) || hasStringKeyValue('color', value);

  const mileage = value['mileage'];
  const hasOptionalMileage =
    notExist(mileage) || hasNumberKeyValue('mileage', value);

  return (
    hasName &&
    hasModel &&
    hasManufacturer &&
    hasFuel &&
    hasType &&
    hasVin &&
    hasOptionalColor &&
    hasOptionalMileage
  );
}

export function cleanFormValues(formValues: VehicleForm): VehicleForm {
  return Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => {
      if (typeof value === 'string') {
        if (key === 'color' && value.trim() === '') {
          return [key, null];
        }
        return [key, value.trim()];
      }
      if (typeof value === 'number' && value === 0) {
        return [key, null];
      }
      return [key, value];
    })
  ) as VehicleForm;
}

// -- Validator functions --
export function stringControlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (typeof control.value === 'string' && control.value.trim() === '') ||
      typeof control.value !== 'string'
      ? { stringControl: { value: control.value } }
      : null;
  };
}

export function numberControlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (typeof control.value === 'number' && isNaN(control.value)) ||
      (typeof control.value !== 'number' &&
        control.value !== undefined &&
        control.value !== null)
      ? { numberControl: { value: control.value } }
      : null;
  };
}
