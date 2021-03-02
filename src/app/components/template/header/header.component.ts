import { UserService } from 'src/app/services/user.service';
import { HeaderService } from './../../../services/header.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrar: boolean = false;
  user: string = '';

  constructor(
    private headerService: HeaderService,
    private userService: UserService,
    private storageService: StorageService
    ) {}

  ngOnInit(): void {
    let email = this.storageService.getLocalUser().email;
    this.userService.get(email).subscribe(user => this.user = user.name);
    this.userService.authenticationState.subscribe(mostrar => this.mostrar = mostrar);
  }

  get title(): string {
    return this.headerService.headerData.title;
  }

  get icon(): string {
    return this.headerService.headerData.icon;
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl;
  }
}
