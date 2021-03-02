import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
    ) { }
  
  
    canActivate(): Promise<boolean> {
      return new Promise(resolve => {
          this.userService.isAuthenticated().subscribe(state => {
              if (!state) {
                this.userService.logout();
                this.router.navigate(['/login']);
              } 
              resolve(state ? true : false);
          })
      });
  }
}
