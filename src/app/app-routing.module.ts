import { AccountUpdateResolver } from './components/account/account-update/guards/accout-update.resolver';
import { DashboardReadResolver } from './components/dashboard/guards/dashboard-read.resolver';
import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { AccountUpdateComponent } from './components/account/account-update/account-update.component';
import { AccountReadComponent } from './components/account/account-read/account-read.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AccountCreateComponent } from './components/account/account-create/account-create.component';
import { UsuarioCadastroComponent } from './components/usuario/usuario-cadastro/usuario-cadastro.component';
import { AboutComponent } from './components/about/about.component';
import { UsuarioLogoutComponent } from './components/usuario/usuario-logout/usuario-logout.component';
import { LoggedGuardService } from './services/logged-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedGuardService],
    resolve: {dashboads: DashboardReadResolver}
  },
  { path: 'account/create', component: AccountCreateComponent, canActivate: [LoggedGuardService] },
  { path: 'account/read/:mes', component: AccountReadComponent, canActivate: [LoggedGuardService] },
  { path: 'account/update/:id', component: AccountUpdateComponent, canActivate: [LoggedGuardService],
    resolve: {account: AccountUpdateResolver}
  },
  { path: 'about', component: AboutComponent, canActivate: [LoggedGuardService] },
  { path: 'login', component: UsuarioLoginComponent, canActivate: [AuthGuardService] },
  { path: 'logout', component: UsuarioLogoutComponent },
  { path: 'cadastro', component: UsuarioCadastroComponent },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
