import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MaterialModule } from './shared/material.module';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ColorRedDirective } from './directives/color-red.directive';
import { ForDirective } from './directives/for.directive';
import { AccountCreateComponent } from './components/account/account-create/account-create.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountReadComponent } from './components/account/account-read/account-read.component';
import { DashboardReadComponent } from './components/dashboard/dashboard-read/dashboard-read.component';
import { AccountUpdateComponent } from './components/account/account-update/account-update.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { NormalizeNumberPipe } from './shared/pipes/normalize-number.pipe';
import { UsuarioCadastroComponent } from './components/usuario/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { AboutComponent } from './components/about/about.component';
import { UsuarioLogoutComponent } from './components/usuario/usuario-logout/usuario-logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardReadResolver } from './components/dashboard/guards/dashboard-read.resolver';
import { DialogMessageComponent } from './components/template/dialog/dialog-message/dialog-message.component';
import { CreateAccountComponent } from './components/template/button/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    DashboardComponent,
    ColorRedDirective,
    ForDirective,
    AccountCreateComponent,
    AccountReadComponent,
    DashboardReadComponent,
    AccountUpdateComponent,
    UsuarioCadastroComponent,
    UsuarioLoginComponent,
    AboutComponent,
    UsuarioLogoutComponent,
    PageNotFoundComponent,
    DialogMessageComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormatDatePipe, NormalizeNumberPipe, DashboardReadResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
