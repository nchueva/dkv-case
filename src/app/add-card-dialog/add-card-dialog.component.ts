import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DefaultService } from '../core/api/v1';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';

interface CarCardDorm {
  name: FormControl<string>;
  manufacturer: FormControl<string>;
  model: FormControl<string>;
  type: FormControl<string>;
  fuel: FormControl<string>;
  vin: FormControl<string>;
  mileage: FormControl<string | null>;
  color: FormControl<string | null>;
}

@Component({
  selector: 'app-add-card-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss',
})
export class AddCardDialogComponent {
  private readonly carsService = inject(DefaultService);
  private readonly formBuilder = inject(FormBuilder);

  // carForm = this.formBuilder.group({
  //   name: ['', Validators.required, { nonNullable: true }],
  //   manufacturer: ['', Validators.required, { nonNullable: true }],
  //   model: ['', Validators.required],
  //   type: ['', Validators.required],
  //   fuel: ['', Validators.required],
  //   vin: ['', Validators.required],
  //   mileage: ['' ],
  //   color: [''],
  // });

  carForm = new FormGroup<CarCardDorm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    manufacturer: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    model: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fuel: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vin: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mileage: new FormControl(''),
    color: new FormControl(''),
  });

  onSubmit() {
    // use this.profileForm.value
    console.log('form value', this.carForm.value);
    // this.carsService.addVehicle()
  }
}
