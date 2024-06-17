import { Routes } from '@angular/router';
import { LoginComponent } from './GoFinance/components/login/login.component';
import { RegisterComponent} from "./GoFinance/components/register/register.component";
import { HistorialComponent } from './GoFinance/components/historial/historial.component';
import {BillsComponent} from "./GoFinance/components/bills/bills.component";
import {ClientsComponent} from "./GoFinance/components/clients/clients.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AuthenticatedGuard} from "./core/guards/authenticated.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthenticatedGuard] },
  { path: 'history', component: HistorialComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillsComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] }
];
