import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserCardComponent } from '../user-card/user-card.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,

    NgFor,
    MatPaginatorModule,
    UserCardComponent,
    LoadingComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users$: Observable<any>;
  pages: number = 0;
  constructor(public usersSrv: UsersService) {}
  ngOnInit(): void {
    this.users$ = this.usersSrv
      .getUsersList()
      .pipe(tap((res) => (this.pages = res?.total)));
  }
  onPageChage($event: PageEvent) {
    this.usersSrv.getData($event.pageIndex + 1);
  }
}
