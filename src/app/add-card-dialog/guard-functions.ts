import { VehicleForm } from '../models/vehicles';

type HasPropertyInput = Record<string, unknown> | null | undefined;
function hasProperty<X extends HasPropertyInput, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return !!obj && prop in obj;
}

function isRecord(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function hasStringKeyValue(key: string, value: object): boolean {
  return (
    isRecord(value) &&
    hasProperty(value, key) &&
    typeof value[key] === 'string' &&
    !!value[key].trim()
  );
}

function hasNumberKeyValue(key: string, value: object): boolean {
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
  const hasOptionalColor =
    !('color' in value) ||
    value['color'] === null ||
    hasStringKeyValue('color', value);
  const hasOptionalMileage =
    !('mileage' in value) ||
    value['mileage'] === null ||
    hasNumberKeyValue('mileage', value);

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
