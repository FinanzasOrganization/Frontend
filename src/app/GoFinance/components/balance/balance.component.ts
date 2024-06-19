import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Router, RouterLink, RouterModule} from "@angular/router";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatNativeDateModule} from "@angular/material/core";
import {DialogComponent} from "../dialog/dialog.component";
import { ApiserviceService } from '../../../services/auth-services/apiservice.service';
import {MatDialog} from "@angular/material/dialog";

interface Balance {
  id: number;
  fecha: Date;
  producto: string;
  monto: number;
  interes: number;
}

interface Pago {
  id: number;
  fecha: Date;
  producto: string;
  monto: number;
}

interface Total {
  saldoActual: number;
  liimiteCredito: number ;
  fechaPagoProxima: Date;
  interesAcumulado: number;
}

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCalendar,
    MatDatepickerModule,
    RouterModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNativeDateModule],
   templateUrl: './balance.component.html',
    styleUrl: './balance.component.css'
  })

export class AccountBalanceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'producto', 'monto', 'interes'];

  balances: Balance[] = [
    { id: 1, fecha: new Date('2021-06-13'), producto: 'productName', monto: 40.95, interes: 1.50 },
    { id: 2, fecha: new Date('2021-06-24'), producto: 'productName', monto: 40.95, interes: 1.50 },
    { id: 3, fecha: new Date('2021-06-15'), producto: 'productName', monto: 40.95, interes: 1.50 },
    { id: 4, fecha: new Date('2021-06-30'), producto: 'productName', monto: 40.95, interes: 1.50 },
    { id: 5, fecha: new Date('2021-06-29'), producto: 'productName', monto: 40.95, interes: 1.50 },
    { id: 6, fecha: new Date('2021-06-28'), producto: 'productName', monto: 40.95, interes: 1.50 },
  ];

  displayedColumnsPagos: string[] = ['id', 'fecha', 'producto', 'monto'];

  pagos: Pago[] = [
    { id: 1, fecha: new Date('2021-06-13'), producto: 'productName', monto: 40.95 },
  ];

  displayedColumnsTotal: string[] = ['saldoActual', 'liimiteCredito', 'fechaPagoProxima', 'interesAcumulado'];

  totales: Total[] = [
    { saldoActual: 70.00, liimiteCredito: 100.00, fechaPagoProxima: new Date('2022-06-13'), interesAcumulado: 5.50},
  ];

  constructor(
    private apiService: ApiserviceService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  logout(){
    this.apiService.logout()
    this.router.navigate(['/login']);
  }

  showDialogsidebar(): void {
    this.dialog
      .open(DialogComponent, {
        data: "¿Deseas cerrar sesión?"
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.logout()
        }
      })
  }
  ngOnInit(): void {}
}
