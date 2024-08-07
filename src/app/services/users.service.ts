import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { User } from '../models/user.model';
import { END_POINTS } from '../constants';
import { LoadingService } from '../components/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  subject = new BehaviorSubject<any>(null);
  users$: Observable<any> = this.subject.asObservable();
  pages: number = 0;
  constructor(private http: HttpClient, private loadingsrv: LoadingService) {
    this.getData(1);
  }
  getData(page: number) {
    const params = new HttpParams().set('page', page);
    this.http
      .get(END_POINTS.USERS, { params })
      .pipe(
        tap((res: any) => {
          this.subject.next(res);
        })
      )
      .subscribe();
  }
  getUsersList() {
    return this.users$;
  }
  getUser(id: string) {
    return this.http.get(END_POINTS.USERS + '/' + id);
  }
  searchUser(value: number): void {
    if (value) {
      this.getUser(value.toString())
        .pipe(
          tap((res: any) => {
            this.subject.next({ data: [res.data] });
            console.log(res);
          })
        )
        .subscribe();
    } else {
      this.getData(1);
    }
  }
}
