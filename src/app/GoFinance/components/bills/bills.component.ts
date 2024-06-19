import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCalendar} from "@angular/material/datepicker";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTooltip} from "@angular/material/tooltip";
import { MatCard } from '@angular/material/card';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl} from "@angular/forms";
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../../services/customer.service';

interface Credit {
  value: string;
  viewValue: string;
}

interface Interest {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bills',
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
    MatTooltip,
    ReactiveFormsModule,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'


})
export class BillsComponent implements OnInit {
  billForm!: FormGroup;
  customers: any[] = [];

  creditTypes: Credit[] = [
    {value: 'SINGLE_PAYMENT', viewValue: 'Contado'},
    {value: 'MULTI_PAYMENT', viewValue: 'Cuotas'}
  ]

  interestType: Interest[] = [
    {value: 'NOMINAL', viewValue: 'Nominal'},
    {value: 'EFECTIVA', viewValue: 'Efectiva'}
  ]

  ngOnInit() {
    this.billForm = new FormGroup({
      'customerId': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'creditType': new FormControl(null, [Validators.required, this.creditTypeValidator]),
      'interestRate': new FormControl(null, [Validators.required, Validators.min(0)]),
      'interestType': new FormControl(null, [Validators.required, this.interestTypeValidator]),
      'installments': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
    this.getAllCustomers();
  }

  constructor(private transactionService: TransactionService, private customerService: CustomerService, private snackBar: MatSnackBar) {}

  creditTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const allowedValues = ['SINGLE_PAYMENT', 'MULTI_PAYMENT'];
    if (control.value && !allowedValues.includes(control.value)) {
      return { 'invalidCreditType': true };
    }
    return null;
  }

  interestTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const allowedValues = ['NOMINAL', 'EFECTIVA'];
    if (control.value && !allowedValues.includes(control.value)) {
      return { 'invalidInterestType': true };
    }
    return null;
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  onSubmit() {
    if (this.billForm.valid) {
      const { customerId, amount, creditType, interestRate, installments, interestType, description } = this.billForm.value;
      this.transactionService.postTransaction(customerId, amount, description, creditType, interestRate, installments, interestType)
        .subscribe(
          response => {
            console.log('Transaction posted successfully', response);
            this.snackBar.open('Venta registrada', 'Cerrar', { duration: 3000 });
          },
          error => {
            console.error('Error posting transaction', error);
            this.snackBar.open('Error al registrar la venta', 'Cerrar', { duration: 3000 });
          }
        );
    }
  }

}
