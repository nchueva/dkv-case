import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Vehicle } from '../models/vehicles';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import { VehiclesApiService } from '../services/vehicles-api.service';

@Component({
  selector: 'home',
  imports: [AsyncPipe, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly vehiclesApiService = inject(VehiclesApiService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  loadingSignal = signal(true);

  vehicles$: Observable<Vehicle[]> = this.vehiclesApiService.getVehicles().pipe(
    tap(() => {
      this.loadingSignal.set(false);
    })
  );

  showDetails(vehicle: Vehicle): void {
    if (vehicle.id) {
      this.router.navigate([`vehicle`], { queryParams: { carId: vehicle.id } });
    } else {
      throw new Error('The card has no id');
    }
  }

  addCard(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent);
    dialogRef.afterClosed().subscribe();
  }
}
