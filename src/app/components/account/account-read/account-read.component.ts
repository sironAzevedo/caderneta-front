import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../template/dialog/dialog-message/dialog-message.component';

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
    private storageService: StorageService,
    public dialog: MatDialog
    ) { 
      this.accountService.listen().subscribe( (r:any) => {
        this.accountService.listAccountByMes(this.emailUser, r).subscribe(res => this.accounts = res);
      })
    }

  ngOnInit(): void {
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

  deletAccount(account: Account) {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Deletar Conta de ' + account.tipoConta.descricao.toLowerCase(),
        text: 'Tem certeza que deseja deletar esta conta?' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(account.codigo && result) {
        this.accountService.deletAccount(this.emailUser, account.codigo).subscribe(() => {
          this.accountService.listAccountByMes(this.emailUser, account.mes.codigo).subscribe(res => {
            if(res.length == 0 || res == null)  {
              this.router.navigate(['/']);
            } 
            this.accounts = res;
          })
        })
        this.accountService.showMessage('Conta excluida com sucesso');
      }
    });
  }

  navigateToAccountCreate(): void {
    this.router.navigate(['/account/create']);
  }
}
