import { Dashboard } from './../model/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmbienteService } from './ambiente.service';

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
    return this.http.get<Dashboard[]>(`${this.baseUrl}/v1/dashboard?email=${email}`);
  }
}
