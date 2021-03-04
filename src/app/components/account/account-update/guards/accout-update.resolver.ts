import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { StorageService } from "src/app/services/storage.service";

@Injectable()
export class AccountUpdateResolver implements Resolve<Account> {
    constructor(
        private accountService: AccountService,
        private storageService: StorageService
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any> | Promise<any>|any {

            let id = +route.params['id']
            let email = this.storageService.getLocalUser().email;
            return this.accountService.get(email, id);
    }
}