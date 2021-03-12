import { AmbienteService } from './ambiente.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subject, throwError } from 'rxjs';
import { Account } from '../model/account.model';
import { Mes } from '../model/mes.model';
import { Status } from '../model/status-conta.model';
import { TipoConta } from '../model/tipo-conta.model';
import { retry, catchError } from 'rxjs/operators';
import { Dashboard } from '../model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = '#';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private ambiente: AmbienteService
  ) {
      this.ambiente.url_account().subscribe(res => this.baseUrl = res);
   }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  create(account: Account): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/v1/contas`, account);
  }

  update(account: Account): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/v1/contas`, account).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  deletAccount(email: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/v1/contas?email=${email}&conta=${id}`);
  }

  get(email: string, id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/v1/contas/by-code?email=${email}&conta=${id}`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  listAccountByMes(email: string, mes: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/v1/contas/by-mes?email=${email}&mes=${mes}`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  listMes(): Observable<Mes[]> {
    return this.http.get<Mes[]>(`${this.baseUrl}/v1/contas/mes`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  getMes(id: number): Observable<Mes> {
    return this.http.get<Mes>(`${this.baseUrl}/v1/contas/mes/by-code?code=${id}`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  listTypeAccount(): Observable<TipoConta[]> {
    return this.http.get<TipoConta[]>(`${this.baseUrl}/v1/contas/tipo`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  listStatusAccount(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/v1/contas/status`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  dashboard(email: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.baseUrl}/v1/contas/dashboard?email=${email}&page=0&size=12`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }


  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(value: number) {
    this._listners.next(value);
  }
}
