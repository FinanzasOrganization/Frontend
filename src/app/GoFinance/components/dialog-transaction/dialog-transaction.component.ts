import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-transaction',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, DatePipe],
  templateUrl: './dialog-transaction.component.html',
  styleUrl: './dialog-transaction.component.css'
})
export class DialogTransactionComponent {
  transactions: any[] = []; // replace Transaction with the type of your transactions
  displayedColumns: string[] = ['id', 'amount', 'description', 'transaction_date', 'installments', 'due_date'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.transactions= data.transactions;
  }
}
