import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../services/auth-services/apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
    MatNativeDateModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  displayedColumns: string[] = ['cliente', 'limiteCredito', 'vencimiento', 'metodoPago', 'montoAcumulado', 'acciones'];
  ventas: Venta[] = [
    {cliente: 'Kaylynn Bator', limiteCredito: 1000, vencimiento: 'No aplica', metodoPago: 'Contado', montoAcumulado: 0},
    {cliente: 'Carter Culhane', limiteCredito: 750, vencimiento: '13/05/2024', metodoPago: 'Crédito', montoAcumulado: 250},
    {cliente: 'Alena Press', limiteCredito: 750, vencimiento: '13/05/2024', metodoPago: 'Cuotas', montoAcumulado: 250},
    {cliente: 'Ashlynn Curtis', limiteCredito: 750, vencimiento: '13/05/2024', metodoPago: 'Crédito', montoAcumulado: 250},
    {cliente: 'Desirae Bator', limiteCredito: 750, vencimiento: '13/05/2024', metodoPago: 'Cuotas', montoAcumulado: 250},
    {cliente: 'Abram Stanton', limiteCredito: 1000, vencimiento: 'No aplica', metodoPago: 'Contado', montoAcumulado: 0},
    {cliente: 'Kaylynn Bator', limiteCredito: 1000, vencimiento: 'No aplica', metodoPago: 'Contado', montoAcumulado: 0},
    {cliente: 'Carter Culhane', limiteCredito: 750, vencimiento: '13/05/2024', metodoPago: 'Crédito', montoAcumulado: 250},
  ];

  constructor(
    private apiService: ApiserviceService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
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
}
