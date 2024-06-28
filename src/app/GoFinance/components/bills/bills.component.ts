import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule, CurrencyPipe, NgIf} from "@angular/common";
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
import { catchError, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

interface Credit {
  value: string;
  viewValue: string;
}

interface Interest {
  value: string;
  viewValue: string;
}

interface Tasa {
  value: string;
  viewValue: string;
}

interface Capitalizacion {
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
    CommonModule,
    NgIf
  ],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'


})
export class BillsComponent implements OnInit {
  billForm!: FormGroup;
  customers: any[] = [];
  showAmountPrefix: boolean = false;

  creditTypes: Credit[] = [
    {value: 'SINGLE_PAYMENT', viewValue: 'Pago único'},
    {value: 'MULTI_PAYMENT', viewValue: 'Cuotas'}
  ]

  interestType: Interest[] = [
    {value: 'NOMINAL', viewValue: 'Nominal'},
    {value: 'EFECTIVA', viewValue: 'Efectiva'}
  ]

  tasaType: Tasa[] = [
    {value: 'MENSUAL', viewValue: 'Mensual'},
    {value: 'BIMESTRAL', viewValue: 'Bimestral'},
    {value: 'TRIMESTRAL', viewValue: 'Trimestral'},
    {value: 'SEMESTRAL', viewValue: 'Semestral'},
    {value: 'ANUAL', viewValue: 'Anual'}
  ]

  capitalizacion: Capitalizacion[] = [
    {value: 'DIARIA', viewValue: 'Diaria'},
    {value: 'QUINCENAL', viewValue: 'Quincenal'},
    {value: 'MENSUAL', viewValue: 'Mensual'}
  ]


  ngOnInit() {
  
    this.billForm = new FormGroup({
      'customerId': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'creditType': new FormControl(null, [Validators.required, this.creditTypeValidator]),
      'interestRate': new FormControl(null, [Validators.required, Validators.min(1)]),
      'interestType': new FormControl(null, [Validators.required, this.interestTypeValidator]),
      'tasaType': new FormControl(null, [Validators.required, this.tasaTypeValidator]),
      'capitalizacion': new FormControl(null, this.capitalizacionValidator),
      'installments': new FormControl(null),
      'description': new FormControl(null, Validators.required)
    });

    this.showInstallments();

    this.getAllCustomers();
  }

  constructor(private transactionService: TransactionService, private customerService: CustomerService, private snackBar: MatSnackBar, private authService: AuthService) {}

  cerrar() {
    this.authService.logOut();
  }

  toggleAmountPrefix() {
    this.showAmountPrefix = true;
  }

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

  tasaTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const allowedValues = ['MENSUAL', 'BIMESTRAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'];
    if (control.value && !allowedValues.includes(control.value)) {
      return { 'invalidTasaType': true };
    }
    return null;
  }

  capitalizacionValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const allowedValues = ['DIARIA', 'QUINCENAL', 'MENSUAL'];
    if (control.value && !allowedValues.includes(control.value)) {
      return { 'invalidCapitalizacion': true };
    }
    return null;
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  showInstallments() {
    if (this.billForm) {
      const creditTypeControl = this.billForm.get('creditType');
      if (creditTypeControl) {
        creditTypeControl.valueChanges.subscribe(creditType => {
          const installmentsControl = this.billForm.get('installments');
          if (installmentsControl) {
            if (creditType === 'MULTI_PAYMENT') {
              installmentsControl.setValidators([Validators.required, Validators.min(2)]);
              installmentsControl.reset();
            } else {
              installmentsControl.setValidators([]);
              installmentsControl.setValue(0);
            }
            installmentsControl.updateValueAndValidity();
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.billForm.valid) {
      const { customerId, amount, description, creditType, interestRate, installments, interestType, tasaType} = this.billForm.value;
      let capitalizacion = this.billForm.value.capitalizacion;
      
      if (interestType === 'EFECTIVA') {
        capitalizacion = 'DIARIA';
      }

      /* Obtén el cliente y sus transacciones
      this.customerService.getCustomerById(customerId).subscribe(customer => {
        this.transactionService.getTransactions(customerId).pipe(
          catchError(error => {
            // Asumir que el error significa que no hay transacciones y continuar
            console.log('No se encontraron transacciones o hubo un error al recuperarlas', error);
            return of({ creditUsed: 0 }); // Retorna un observable con creditUsed como 0
          })
        ).subscribe(transactions => {
          const creditUsed = transactions.creditUsed || 0;
          const remainingCredit = customer.creditLimit - creditUsed;
  
          if (amount > remainingCredit) {
            console.error('Error posting transaction: This transaction exceeds the user\'s available credit');
            this.snackBar.open('Esta transacción excede el crédito disponible del usuario.', 'Cerrar', { duration: 3000 });
          } else {
           */
            this.transactionService.postTransaction(customerId, amount, description, creditType, "PURCHASE", interestRate, installments, interestType, tasaType, capitalizacion)
              .subscribe(
                response => {
                  console.log('Transaction posted successfully', response);
                  this.snackBar.open('Venta registrada', 'Cerrar', { duration: 3000 });
                },
                error => {
                  console.error('Credit limit exceeded', error);
                  this.snackBar.open('Esta transacción excede el crédito disponible del usuario.', 'Cerrar', { duration: 3000 });
                }
              );
          }
        }


}
