import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { catchError, Subject, take } from 'rxjs';
import { VehiclesApiService } from '../services/vehicles-api.service';
import { isVehicleForm } from './guard-functions';

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
    mileage: new FormControl<number | null>(null),
    color: new FormControl<string | null>(null),
  });

  onSubmit() {
    console.log('carForm invalid', this.carForm.invalid);
    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
    } else {
      // TODO: trim strings and convert 0 to null for mileage
      this.showError$$.next(false);
      console.log(
        'isVehicleForm(this.carForm.value)',
        isVehicleForm(this.carForm.value)
      );
      console.log('this.carForm.value', this.carForm.value);
      if (isVehicleForm(this.carForm.value)) {
        console.log('is true');
        // this.vehiclesApiService
        //   .addNewVehicle(this.carForm.value)
        //   .pipe(
        //     take(1),
        //     catchError((err) => err)
        //   )
        //   .subscribe({
        //     next: () => {
        //       // refresh all vehicles and close the dialog
        //       this.vehiclesApiService.refreshVehicles();
        //       this.closeDialog();
        //     },
        //     error: (err) => {
        //       this.showError$$.next(true); // show error alert
        //       throw new Error('There is an error in adding a new card:', err);
        //     },
        //   });
      } else {
        console.error("Form can not be saved because of wrong input's types");
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeAlert() {
    this.showError$$.next(false);
  }
}
