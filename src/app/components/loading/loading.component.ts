import { Component, Inject } from '@angular/core';
// import { MatSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from './loading.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  providers: [],
})
export class LoadingComponent {
  // loadingSrv = Inject(LoadingService);
  constructor(public loadingSrv: LoadingService) {
    // this.loadingSrv.loading$.pipe(tap((loading) => console.log(loading)));
  }
}
