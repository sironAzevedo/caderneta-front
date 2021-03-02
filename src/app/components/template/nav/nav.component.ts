import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  mostrar: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.authenticationState.subscribe(mostrar => this.mostrar = mostrar);
  }

}
