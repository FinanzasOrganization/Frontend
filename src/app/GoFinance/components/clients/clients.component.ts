import { Component, OnInit } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatNativeDateModule} from "@angular/material/core";
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../../core/services/auth.service';

interface Cliente {
  nombre: string;
  id: number;
  tasaInteres: number;
  fechaPago: Date;
  credito: number;
}

@Component({
  selector: 'app-clients',
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
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterLink,
    MatNativeDateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'id', 'interestRate', 'monthlyPaymentDate', 'creditLimit', "account-balance", "delete"];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllCustomers();
  }

  cerrar() {
    this.authService.logOut();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      // Actualizar los datos de la tabla después de eliminar un cliente
      this.getAllCustomers();
    });
  }

  getAccountBalance(customerId: number) {
    this.router.navigate(['/account-balance', customerId]);
  }
}
