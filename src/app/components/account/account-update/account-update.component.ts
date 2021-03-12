import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { Mes } from 'src/app/model/mes.model';
import { Status } from 'src/app/model/status-conta.model';
import { TipoConta } from 'src/app/model/tipo-conta.model';
import { AccountService } from 'src/app/services/account.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { NormalizeNumberPipe } from 'src/app/shared/pipes/normalize-number.pipe';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css'],
  providers: [
     // {provide: DateAdapter, useClass: CustomDateAdapter}
    //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    //{provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class AccountUpdateComponent implements OnInit {

  formAccount: FormGroup;
  meses: Mes[] = [];
  tipoContas: TipoConta[] = [];
  statusContas: Status[] = [];
  mesId?: number;
  contaId?: number;
  emailUser: string = 'cliente@email.com';
  addCan = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private dateFormat: FormatDatePipe,
    private normalizeNumber: NormalizeNumberPipe,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private storageService: StorageService,
    private dialogRef: MatDialogRef<AccountUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
    let account = data.account;
    this.formAccount = this.fb.group({
      codigo: [account.codigo],
      mes: [account.mes.codigo, Validators.required],
      conta: [account.tipoConta.codigo, Validators.required],
      valorConta: ['R$ ' + account.valorConta, Validators.required],
      status: [account.status.codigo, Validators.required],
      dataVencimento: [new Date(account.dataVencimento), Validators.required],
      dataPagamento: [new Date(account.dataPagamento||"")],
      comentario: [account.comentario]
    });
    dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.emailUser = this.storageService.getLocalUser().email;
    this.accountService.listMes().subscribe(res => this.meses = res);
    this.accountService.listTypeAccount().subscribe(res => this.tipoContas = res);
    this.accountService.listStatusAccount().subscribe(res => this.statusContas = res);
  }

  update(): void {
    this.addCan = true;
    const formValues = this.formAccount?.value;
    const mes = {
      codigo: formValues.mes
    } as Mes;

    const tipoConta = {
      codigo: formValues.conta
    } as TipoConta;

    const status = {
      codigo: formValues.status
    } as Status;
    
    const account: Account = {
      codigo: formValues.codigo,
      emailUser: this.emailUser,
      valorConta: this.normalizeNumber.transform(formValues.valorConta),
      dataVencimento: this.dateFormat.transform(formValues.dataVencimento),
      dataPagamento: this.dateFormat.transform(formValues.dataPagamento || ""),
      mes: mes,
      status: status,
      qtdParcelas: 0,
      comentario: formValues.comentario,
      tipoConta: tipoConta
    }

    this.accountService.update(account).subscribe(() => {
      this.accountService.showMessage('Conta atualizada com sucesso');
      this.accountService.filter(mes.codigo);
      this.dialogRef.close();
    })
  }

  inputKeyPressAsBrlCurrency(event: KeyboardEvent) {
    const patternBeforeComma = /[0-9,]/;
    const patternAfterComma = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const eventTarget = <HTMLInputElement>event.target;
    const fieldClean = this.normalizeNumber.transform(eventTarget.value).replace(/\./g, '');

    switch (true) {
      case (eventTarget.value.indexOf(',') !== -1):
        eventTarget.value = eventTarget.value.replace('.,', ',');

        if (!patternAfterComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
        }

        break;

      case (event.key === ','):
        break;

      default:
        if (!patternBeforeComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
          return;
        }

        if (eventTarget.value.indexOf('R$') === -1) {
          eventTarget.value = `R$ ${eventTarget.value}`;
        }

        eventTarget.value = eventTarget.value.replace(/\./g, '');

        switch (true) {
          case (fieldClean.length + 1 > 4 && (fieldClean.length + 1) % 3 === 2):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{2})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          case (fieldClean.length + 1 > 3 && (fieldClean.length + 1) % 3 === 1):
            eventTarget.value = eventTarget.value.replace(/(R\$ \d{1})([0-9\.]*)/, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          default:
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');
        }

        break;
    }
  }
}
