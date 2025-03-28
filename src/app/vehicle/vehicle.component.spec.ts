import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { VehiclesApiService } from '../services/vehicles-api.service';
import { Vehicle } from '../models/vehicles';

const obj: Vehicle = {
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
  const mockVehiclesApiService = {
    getVehicleById: () => of('obj'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ carId: 40 }),
          },
        },
        {
          provide: VehiclesApiService,
          useValue: mockVehiclesApiService,
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
