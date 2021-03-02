import { NormalizeNumberPipe } from './../../../shared/pipes/normalize-number.pipe';
import { Status } from './../../../model/status-conta.model';
import { Account } from './../../../model/account.model';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mes } from 'src/app/model/mes.model';
import { TipoConta } from 'src/app/model/tipo-conta.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  formAccount: FormGroup;
  meses: Mes[] = [];
  tipoContas: TipoConta[] = [];
  statusContas: Status[] = [];
  emailUser: string = '';
  addCan = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private dateFormat: FormatDatePipe,
    private normalizeNumber: NormalizeNumberPipe,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private storageService: StorageService
    ) { 
      dateAdapter.setLocale('pt-BR');

      this.formAccount = this.fb.group({
        mes: ['', Validators.required],
        conta: ['', Validators.required],
        valorConta: ['', Validators.required],
        status: ['', Validators.required],
        dataVencimento: ['', Validators.required],
        dataPagamento: [''],        
        comentario: ['']
      });
    }

  ngOnInit(): void {
    this.emailUser = this.storageService.getLocalUser().email;
    this.accountService.listMes().subscribe(res => this.meses = res);
    this.accountService.listTypeAccount().subscribe(res => this.tipoContas = res);
    this.accountService.listStatusAccount().subscribe(res => this.statusContas = res);
  }

  createAccount(): void {
    this.addCan= true;
    const formValues = this.formAccount.value;
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

    this.accountService.create(account).subscribe(() => {
      this.accountService.showMessage('Conta inserida com sucesso');
      this.router.navigate(['/account/read', mes.codigo]);
    })
  }

  cancelAccount(): void {
    this.router.navigate(['/']);
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
