import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DefaultService } from '../core/api/v1';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { VehicleForm } from '../models/vehicles';
import { catchError, Subject, take, tap } from 'rxjs';
import { VehiclesApiService } from '../services/vehicles-api.service';

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
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss',
})
export class AddCardDialogComponent {
  private readonly vehiclesApiService = inject(VehiclesApiService);

  constructor(public dialogRef: MatDialogRef<AddCardDialogComponent>) {}

  private readonly showError$$ = new Subject<boolean>();
  showError$ = this.showError$$.asObservable();

  carForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    manufacturer: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fuel: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vin: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mileage: new FormControl<string | null>(null),
    color: new FormControl<string | null>(null),
  });

  onSubmit() {
    console.log('carForm', this.carForm.invalid);
    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
    } else {
      this.showError$$.next(false);
      this.vehiclesApiService
        .addNewVehicle(this.carForm.value as VehicleForm)
        .pipe(
          take(1),
          catchError((err) => err)
        )
        .subscribe({
          next: (res) => {
            if (res) {
              // refresh all vehicles and close the dialog
              this.vehiclesApiService.refreshVehicles();
              this.closeDialog();
            }
          },
          error: (err) => {
            // show error message
            this.showError$$.next(true);
            console.log('There is an error in adding a new card:', err);
          },
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeAlert() {
    this.showError$$.next(false);
  }
}
