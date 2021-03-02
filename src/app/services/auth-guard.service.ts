import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
    ) { }
    
    canActivate(): Promise<boolean> {
      return new Promise(resolve => {
          this.userService.isAuthenticated().subscribe(state => {
              if (state) {
                this.router.navigate(['/dashboard']);
              } 
              resolve(!state ? true : false);
          })
      });
  }
}
