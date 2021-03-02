import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-read',
  templateUrl: './account-read.component.html',
  styleUrls: ['./account-read.component.css']
})
export class AccountReadComponent implements OnInit {

  accounts: Account[] = [];
  mesId: number = 0;
  dsMes?: string;
  emailUser: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {;
    this.emailUser = this.storageService.getLocalUser().email;
    this.route.params.subscribe(params => {
      if(params) {
        this.mesId = +params['mes'];
        this.accountService.getMes(this.mesId).subscribe(res => this.dsMes = res.dsMes);
        this.accountService.listAccountByMes(this.emailUser, this.mesId).subscribe(res => this.accounts = res);
      }
   });
  }

  updateAccount(id: any) {
    this.router.navigate(['/account/update', id]);
  }

  deletAccount(id: any) {
    this.accountService.deletAccount(this.emailUser, +id).subscribe(() => {      
      this.accountService.listAccountByMes(this.emailUser, this.mesId).subscribe(res => {
          this.accounts = res;
          if(this.accounts.length == 0 || this.accounts == null)  {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/account/read', this.mesId]);
          }
      })
      this.accountService.showMessage('Conta excluida com sucesso');
    })
  }

  navigateToAccountCreate(): void {
    this.router.navigate(['/account/create']);
  }
}
