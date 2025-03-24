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
    isRecord(value) &&
    hasProperty(value, key) &&
    typeof value[key] === 'string' &&
    !!value[key].trim()
  );
}

export function hasNumberKeyValue(key: string, value: object): boolean {
  return (
    isRecord(value) && hasProperty(value, key) && typeof value[key] === 'number'
  );
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
  const hasOptionalColor = !value['color'] || hasStringKeyValue('color', value);
  const hasOptionalMileage =
    !value['mileage'] || hasNumberKeyValue('mileage', value);

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
        return [key, value.trim()];
      }
      if (typeof value === 'number' && value === 0) {
        return [key, null];
      }
      return [key, value];
    })
  ) as VehicleForm;
}
