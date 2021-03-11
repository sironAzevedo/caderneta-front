import { StorageService } from './../../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Dashboard } from 'src/app/model/dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HeaderService } from 'src/app/services/header.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountCreateComponent } from '../../account/account-create/account-create.component';

@Component({
  selector: 'app-dashboard-read',
  templateUrl: './dashboard-read.component.html',
  styleUrls: ['./dashboard-read.component.css'],
})
export class DashboardReadComponent implements OnInit {

  dashboard: Dashboard[] = [];
  order: number;
  mostrar: boolean;

  constructor(
    private headerService:HeaderService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    public dialog: MatDialog
  ) { 
    this.mostrar = false;
    this.order = 2;
    this.headerService.headerData = {
      title: 'Dashboard',
      icon: 'dashboard',
      routeUrl: '#'
    }
  }

  ngOnInit(): void {
      this.route.data.subscribe(
        (info) => {
          console.log(info)
          this.dashboard = info.dashboads.content;
          if(this.dashboard.length !== 0) {
            this.mostrar = true;
          }
        })
  }

  navigateToAccountRead(id: string): void {
    this.router.navigate(['/account/read', id]);
  }

  orderList(num: number) {
    this.order = num;
  }
}
