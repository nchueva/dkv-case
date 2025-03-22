import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DefaultService } from '../core/api/v1';
import { AsyncPipe } from '@angular/common';
import { Vehicle } from '../models/vehicles';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import { VehiclesApiService } from '../services/vehicles-api.service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  private readonly vehiclesApiService = inject(VehiclesApiService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  cars$: Observable<Vehicle[]> = this.vehiclesApiService.getVehicles();

  showDetails(car: Vehicle): void {
    if (car.id) {
      this.router.navigate([`vehicle`], { queryParams: { carId: car.id } });
    } else {
      throw new Error('The card has no id');
    }
  }

  addCard(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      // TODO: unsubscribe
      // TODO: show success toast
    });
  }

  ngOnDestroy(): void {}
}
