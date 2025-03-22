import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DefaultService } from '../core/api/v1';
import { AsyncPipe } from '@angular/common';
import { Vehicle } from '../models/vehicles';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly carsService = inject(DefaultService);
  private readonly router = inject(Router);

  cars$: Observable<Vehicle[]> = this.carsService.getVehicles().pipe(
    map((cars: Vehicle[]) => {
      return cars.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        } else if (a.name && !b.name) {
          return -1; // place a before b => [a,b]
        } else if (!a.name && b.name) {
          return 1; // place b before a => [b,a]
        }

        return 0; // both don't exist, consider them as equal
      });
    }),
    tap((cars: Vehicle[]) => {
      console.log('cars', cars);
      const fullView = cars.filter((car) => car.color || car.mileage);
      console.log(fullView);
    })
  );

  showDetails(car: Vehicle): void {
    if (car.id) {
      this.router.navigate([`vehicle`], { queryParams: { carId: car.id } });
    } else {
      console.log('The card has no id');
    }
  }

  readonly dialog = inject(MatDialog);

  addCard(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // TODO: unsubscribe
    });
  }
}
