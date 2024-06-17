import { Component, OnInit } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatNativeDateModule} from "@angular/material/core";
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiserviceService } from '../../../services/auth-services/apiservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  displayedColumns: string[] = ['nombre', 'id', 'tasaInteres', 'fechaPago', 'credito', 'acciones'];
  clientes: Cliente[] = [
    {nombre: 'Kaylynn Bator', id: 1, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 1000},
    {nombre: 'Carter Culhane', id: 2, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 750},
    {nombre: 'Alena Press', id: 3, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 750},
    {nombre: 'Ashlynn Curtis', id: 4, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 750},
    {nombre: 'Desirae Bator', id: 5, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 750},
    {nombre: 'Abram Stanton', id: 6, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 1000},
    {nombre: 'Kaylynn Bator', id: 7, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 1000},
    {nombre: 'Carter Culhane', id: 8, tasaInteres: 0.05, fechaPago: new Date('2021-05-13'), credito: 750},
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
