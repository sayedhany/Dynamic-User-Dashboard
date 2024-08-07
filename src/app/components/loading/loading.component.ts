import { Component, Inject } from '@angular/core';
// import { MatSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from './loading.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  providers: [],
})
export class LoadingComponent {
  loadingSrv = Inject(LoadingService);
}
