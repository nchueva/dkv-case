import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDialogComponent } from './add-card-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefaultService } from '../core/api/v1';
import { of } from 'rxjs';

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

describe('AddCardDialogComponent', () => {
  let component: AddCardDialogComponent;
  let fixture: ComponentFixture<AddCardDialogComponent>;
  const mockDefaultService = {
    addNewVehicle: () => of(obj),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: DefaultService,
          useValue: mockDefaultService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
