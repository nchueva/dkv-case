import {
  hasNumberKeyValue,
  hasProperty,
  isRecord,
  isVehicleForm,
} from './guard-functions';

class VehicleFormTest {
  name = 'Name 1';
  manufacturer = 'BMW';
  model = 'XXX';
  fuel = 'Electro';
  type: unknown;
  vin: unknown;
  color?: unknown;
  mileage?: unknown;

  constructor(
    type: unknown,
    vin: unknown,
    color?: unknown | null,
    mileage?: unknown | null
  ) {
    this.type = type;
    this.vin = vin;
    this.color = color;
    this.mileage = mileage;
  }
}

describe('AddCardDialogComponent', () => {
  const obj = new VehicleFormTest('car', 'YUT847TY');

  it('obj should be a record', () => {
    expect(isRecord(obj)).toBeTruthy();
  });

  it('should have mileage property', () => {
    if (isRecord(obj)) {
      expect(hasProperty(obj, 'mileage')).toBeTruthy();
    }
  });

  it('mileage should not have number value', () => {
    expect(hasNumberKeyValue('mileage', obj)).toBeFalse;
  });

  it('obj should be VehicleForm', () => {
    expect(isVehicleForm(obj)).toBeTruthy();
    const obj2 = new VehicleFormTest('car', 'YYYYYY', null, null);
    expect(isVehicleForm(obj2)).toBeTruthy;
    const obj3 = new VehicleFormTest('car', 'YYYYYY');
    expect(isVehicleForm(obj3)).toBeTruthy;
  });

  it('obj should not be VehicleForm', () => {
    const obj2 = new VehicleFormTest('car', 'YUT847TY', 'red', '4');
    expect(isVehicleForm(obj2)).toBeFalsy;
    const obj3 = new VehicleFormTest('car', 'YUT847TY', 7, undefined);
    expect(isVehicleForm(obj3)).toBeFalsy;
    const obj4 = new VehicleFormTest('car', '', undefined, null);
    expect(isVehicleForm(obj4)).toBeFalsy;
    const obj5 = new VehicleFormTest('car', '');
    expect(isVehicleForm(obj5)).toBeFalsy;
  });
});
