import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  shareReplay,
  tap,
  throwError,
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

  private saveToCache(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getFromCache(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private getCacheKey(page: number): string {
    return `users-page-${page}`;
  }

  getData(page: number) {
    const cacheKey = this.getCacheKey(page);
    const cachedData = this.getFromCache(cacheKey);

    if (cachedData) {
      this.subject.next(cachedData);
      return of(cachedData);
    } else {
      this.loadingsrv.loadingOn();
      const params = new HttpParams().set('page', page);
      return this.http
        .get(END_POINTS.USERS, { params })
        .pipe(
          tap((res: any) => {
            this.saveToCache(cacheKey, res);
            this.subject.next(res);
          }),
          shareReplay()
        )
        .subscribe(() => {
          this.loadingsrv.loadingOff();
        });
    }
  }

  getUsersList() {
    return this.users$;
  }

  getUser(id: string) {
    const cacheKey = `user-${id}`;
    const cachedUser = this.getFromCache(cacheKey);

    if (cachedUser) {
      return of(cachedUser);
    } else {
      this.loadingsrv.loadingOn();
      return this.http.get(END_POINTS.USERS + '/' + id).pipe(
        tap((res: any) => {
          this.saveToCache(cacheKey, res);
        }),
        finalize(() => this.loadingsrv.loadingOff()),
        shareReplay()
      );
    }
  }

  searchUser(value: number): void {
    if (value) {
      this.getUser(value.toString())
        .pipe(
          tap((res: any) => {
            this.subject.next({ data: [res.data] });
            console.log(res);
          }),
          catchError((res) => {
            this.subject.next([]);
            return throwError('');
          })
        )
        .subscribe();
    } else {
      this.getData(1);
    }
  }
}
