import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DefaultService } from '../core/api/v1';

const obj = {
  name: 'Name 1',
  manufacturer: 'BMW',
  model: 'XXX',
  fuel: 'Electro',
  type: 'car',
  vin: '1W4EIY',
  color: 'yellow',
  mileage: null,
};

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  const mockDefaultService = {
    getVehicles: () => of(obj),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ carId: 123 }),
          },
        },
        {
          provide: DefaultService,
          useValue: mockDefaultService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
