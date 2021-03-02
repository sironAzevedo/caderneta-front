import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { tap} from 'rxjs/operators';
import { Credenciais, LocalUser } from '../model/credenciais.model';
import { User } from '../model/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authenticationState = new BehaviorSubject(false);
  private baseUrl: string = 'http://localhost:8765';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private snackBar: MatSnackBar
  ) { }


  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  authenticate(user: Credenciais): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ms-user/v1/user/login`, user);
  }

  create(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ms-user/v1/user`, user);
  }

  get(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/ms-user/v1/user/by-email?email=${email}`);
  }

  successfulLogin(authorizationValue: string) {
    //const tok = authorizationValue.substring(7);
    const user: LocalUser = {       
      email: authorizationValue
      //email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    this.authenticationState.next(true);
  }

  isAuthenticated(): Observable<boolean> {
    const jwt = this.storage.getLocalUser();
    if(jwt) {
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    }
    
    /* if (jwt && !this.jwtHelper.isTokenExpired(jwt.token)) {
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    } */
    return of(this.authenticationState.value);
  }

  logout() {
    this.authenticationState.next(false);
    this.storage.setLocalUser(null as any);    
  }
}
