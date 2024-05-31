import { Routes } from '@angular/router';
import { LoginComponent } from './GoFinance/components/login/login.component';
import { RegisterComponent} from "./GoFinance/components/register/register.component";
import { HistorialComponent } from './GoFinance/components/historial/historial.component';
import {BillsComponent} from "./GoFinance/components/bills/bills.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'history', component: HistorialComponent },
  { path: 'bills', component: BillsComponent },
];
