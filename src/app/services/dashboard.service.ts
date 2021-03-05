import { Dashboard } from './../model/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AmbienteService } from './ambiente.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = '#';

  constructor(
    private http: HttpClient,
    private ambiente: AmbienteService
  ) {
    this.ambiente.url_dashboard().subscribe(res => this.baseUrl = res);
   }

  findAll(email: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.baseUrl}/v1/dashboard?email=${email}`).pipe(
      retry(3),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
}
