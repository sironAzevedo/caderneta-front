import { HeaderService } from './../../services/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private headerService:HeaderService
  ) { 
    this.headerService.headerData = {
      title: 'About',
      icon: 'announcement',
      routeUrl: '#'
    }
  }

  ngOnInit(): void {
  }

}
