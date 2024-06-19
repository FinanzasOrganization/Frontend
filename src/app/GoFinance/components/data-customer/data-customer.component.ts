import { Component, OnInit} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
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
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTooltip} from "@angular/material/tooltip";
import { MatCard } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatTooltip,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './data-customer.component.html',
  styleUrl: './data-customer.component.css'
})
export class DataCustomerComponent implements OnInit {

  customerForm!: FormGroup;

  ngOnInit() {
    this.customerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.min(1)]),
      'address': new FormControl(null, [Validators.required, Validators.min(1)]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(9)]),
      'email': new FormControl(null, [Validators.required, Validators.min(1)]),
      'creditLimit': new FormControl(null, [Validators.required, Validators.min(100), Validators.max(5000)]),
      'monthlyPaymentDate': new FormControl(null, [Validators.required, this.futureDateValidator]),
      'interestRate': new FormControl(null, [Validators.required, Validators.min(1)]),
      'penaltyInterestRate': new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {}


  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Asegurarse de que la hora no afecte la comparación
  
    if (selectedDate < currentDate) {
      return { pastDate: true };
    }
  
    return null;
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const { name, address, phone, email, creditLimit, monthlyPaymentDate, interestRate, penaltyInterestRate } = this.customerForm.value;
      this.customerService.postCustomer(name, address, phone, email, creditLimit, monthlyPaymentDate, interestRate, penaltyInterestRate)
      .subscribe(
        response => {
          console.log('Customer created successfully', response);
          this.snackBar.open('Cliente registrado', 'Cerrar', { duration: 3000 });
        },
        error => {
          console.error('Error creating customer', error);
          this.snackBar.open('Error al registrar el cliente', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

}
