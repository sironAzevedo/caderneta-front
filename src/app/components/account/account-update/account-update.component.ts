import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { Mes } from 'src/app/model/mes.model';
import { Status } from 'src/app/model/status-conta.model';
import { TipoConta } from 'src/app/model/tipo-conta.model';
import { AccountService } from 'src/app/services/account.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { NormalizeNumberPipe } from 'src/app/shared/pipes/normalize-number.pipe';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
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
    private storageService: StorageService
  ) { 
    dateAdapter.setLocale('pt-BR');

    this.formAccount = this.fb.group({
      codigo: [''],
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
    this.loadAccount();
  }

  validFields() {
    this.formAccount = this.fb.group({
      codigo: [''],
      mes: ['', Validators.required],
      conta: ['', Validators.required],
      valorConta: ['', Validators.required],
      status: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      dataPagamento: [''],
      comentario: ['']
    });
  }

  loadAccount() {
   this.route.data.subscribe(
     (info) => {
       let account = info.account;
       this.contaId = account.codigo;
       this.formAccount?.controls['mes'].setValue(account.mes.codigo);
       this.formAccount?.controls['conta'].setValue(account.tipoConta.codigo);
       this.formAccount?.controls['valorConta'].setValue('R$ ' + account.valorConta);
       this.formAccount?.controls['status'].setValue(account.status.codigo);
       this.formAccount?.controls['dataVencimento'].setValue(new Date(account.dataVencimento));
       this.formAccount?.controls['dataPagamento'].setValue(new Date(account.dataPagamento||""));
       this.formAccount?.controls['comentario'].setValue(account.comentario);
       this.mesId = account.mes.codigo;
       console.log(account)
     }
   )
  }

  update(): void {
    this.addCan= true;
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
      codigo: this.contaId,
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
      this.router.navigate(['/account/read', mes.codigo]);
    })
  }

  cancel(): void {
    this.router.navigate(['/account/read', this.mesId]);
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
