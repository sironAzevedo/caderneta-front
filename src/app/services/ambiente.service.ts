import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  env: any = 'local';

  constructor() { 
    this.env = localStorage.getItem('env');
  }

  url_account(): Observable<string> {
    let res: string = '';
    if(this.env === null) {
      res = 'http://localhost:8001';
    } else {
      res = 'https://caderneta-contas-services.herokuapp.com'
    }
    return of(res);
  }

  url_user(): Observable<string> {
    let res: string = '';
    if(this.env === null) {
      res = 'http://localhost:8002';
    } else {
      res = 'https://caderneta-user-services.herokuapp.com'
    }
    return of(res);
  }

  url_dashboard(): Observable<string> {
    let res: string = '';
    if(this.env === null) {
      res = 'http://localhost:8003';
    } else {
      res = 'https://caderneta-dashboard-services.herokuapp.com'
    }
    return of(res);
  }
}
