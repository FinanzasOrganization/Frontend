import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { TransactionService } from '../../services/transaction.service';
import { DialogTransactionComponent } from '../dialog-transaction/dialog-transaction.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map } from 'rxjs';

interface Venta {
  cliente: string;
  limiteCredito: number;
  vencimiento: string;
  metodoPago: string;
  montoAcumulado: number;
}


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCalendar,
    MatDatepickerModule,
    RouterModule,
    RouterLink,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNativeDateModule,
    DialogTransactionComponent,
    ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'creditLimit', 'dueDate', 'creditType', 'status', 'amount'];
  transactions: any[] = [];
  dataSource = new MatTableDataSource<any>(this.transactions);

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  cerrar() {
    this.authService.logOut();
  }


  getAllTransactions(): void {
    this.transactionService.getAllTransactions().subscribe((transactions: any[]) => {
      this.transactions = transactions.filter((transaction: any) => transaction.status === "PENDING");
      this.dataSource.data = this.transactions;
    });
  }
  

}
