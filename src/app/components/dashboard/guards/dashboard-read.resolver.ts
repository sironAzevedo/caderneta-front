import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Dashboard } from "src/app/model/dashboard.model";
import { AccountService } from "src/app/services/account.service";
import { DashboardService } from "src/app/services/dashboard.service";
import { StorageService } from "src/app/services/storage.service";

@Injectable()
export class DashboardReadResolver implements Resolve<Dashboard[]> {
    constructor(
        private dashboardService: DashboardService,
        private storageService: StorageService,
        private accountService: AccountService
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any> | Promise<any>|any {

            const email = this.storageService.getLocalUser().email;
            return this.accountService.dashboard(email);
        }
}