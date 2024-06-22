import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-payment-plan-dialog',
  standalone: true,
  imports: [MatTableModule, MatDialogModule],
  templateUrl: './payment-plan-dialog.component.html',
  styleUrl: './payment-plan-dialog.component.css'
})
export class PaymentPlanDialogComponent {
  displayedColumns: string[] = ['description', 'amount', 'interestType', 'appliedInterest', 'interestAmount', 'penaltyInterestRate', 'transactionDate', 'creditType', 'installments', 'dueDate'];
  
  transactions: any[]; // Asumiendo que transactions es un array
  totalDebt: number;
  totalInterest: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { transactions: any[]; totalDebt: number; totalInterest: number }) {
    this.transactions = data.transactions;
    this.totalDebt = data.totalDebt;
    this.totalInterest = data.totalInterest;
  }
}
