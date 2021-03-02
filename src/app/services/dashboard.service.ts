import { Dashboard } from './../model/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = 'http://localhost:8765';

  constructor(
    private http: HttpClient
  ) { }

  findAll(email: string): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.baseUrl + `/ms-dashboard/v1/dashboard?email=${email}`);
  }
}
