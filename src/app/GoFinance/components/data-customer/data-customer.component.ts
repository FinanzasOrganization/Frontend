import { Component, OnInit} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCalendar } from '@angular/material/datepicker';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTooltip} from "@angular/material/tooltip";
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-data-customer',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatCalendar,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    MatCheckbox,
    MatTooltip
  ],
  templateUrl: './data-customer.component.html',
  styleUrl: './data-customer.component.css'
})
export class DataCustomerComponent {

}
