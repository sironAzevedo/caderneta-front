import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Account } from '../model/account.model';
import { Mes } from '../model/mes.model';
import { Status } from '../model/status-conta.model';
import { TipoConta } from '../model/tipo-conta.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = 'http://localhost:8765';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  create(account: Account): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ms-contas/v1/account`, account);
  }

  update(account: Account): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/ms-contas/v1/contas`, account);
  }

  deletAccount(email: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/ms-contas/v1/contas?email=${email}&conta=${id}`);
  }

  get(email: string, id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/ms-contas/v1/contas/by-code?email=${email}&conta=${id}`);
  }

  listAccountByMes(email: string, mes: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/ms-contas/v1/contas/by-mes?email=${email}&mes=${mes}`);
  }

  listMes(): Observable<Mes[]> {
    return this.http.get<Mes[]>(`${this.baseUrl}/ms-contas/v1/contas/mes`);
  }

  getMes(id: number): Observable<Mes> {
    return this.http.get<Mes>(`${this.baseUrl}/ms-contas/v1/contas/mes/by-code?code=${id}`);
  }

  listTypeAccount(): Observable<TipoConta[]> {
    return this.http.get<TipoConta[]>(`${this.baseUrl}/ms-contas/v1/contas/tipo`);
  }

  listStatusAccount(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/ms-contas/v1/contas/status`);
  }
}
