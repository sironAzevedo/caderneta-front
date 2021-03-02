import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario-logout',
  templateUrl: './usuario-logout.component.html',
  styleUrls: ['./usuario-logout.component.css']
})
export class UsuarioLogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
