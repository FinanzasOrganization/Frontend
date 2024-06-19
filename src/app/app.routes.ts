import { Routes } from '@angular/router';
import { LoginComponent } from './GoFinance/components/authentication/login/login.component';
import { RegisterComponent} from "./GoFinance/components/authentication/register/register.component";
import { HistorialComponent } from './GoFinance/components/historial/historial.component';
import {BillsComponent} from "./GoFinance/components/bills/bills.component";
import {ClientsComponent} from "./GoFinance/components/clients/clients.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthenticatedGuard} from "./core/guards/authenticated.guard";
import { DataCustomerComponent } from './GoFinance/components/data-customer/data-customer.component';
import { AccountBalanceComponent } from './GoFinance/components/account-balance/account-balance/account-balance.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticatedGuard] },
  { path: 'history', component: HistorialComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillsComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'data-customer', component: DataCustomerComponent, canActivate: [AuthGuard] },
  { path: 'account-balance/:id', component: AccountBalanceComponent, canActivate: [AuthGuard]}
];
