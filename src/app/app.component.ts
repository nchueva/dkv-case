import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiModule, DefaultService } from './core/api/v1';
import { BaseService } from './core/api/v1/api.base.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dkv-case';
  carsService = inject(DefaultService);
  cars$ = this.carsService
    .getVehicles()
    .pipe(tap((cars) => console.log('cars', cars)));
}
