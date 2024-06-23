import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionService } from '../../../services/transaction.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerService } from '../../../services/customer.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';
import { PaymentPlanDialogComponent } from '../../payment-plan-dialog/payment-plan-dialog.component';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [MatTableModule, MatCalendar, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatButtonModule, MatDialogModule, PaymentPlanDialogComponent],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.css'
})
export class AccountBalanceComponent implements OnInit {
  customerTransactions: any[] = []
  paidTransactions: any[] = []
  remainingCredit: any;
  creditUsed: any;
  creditLimit: any;
  dueDate: any;
  totalInterest: any;
  totalDebt: any;
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>(this.customerTransactions);
  displayedColumns: string[] = ['id', 'transactionDate', 'description', 'amount', 'interestAmount', 'status', 'select']
  totalDisplayedColumns: string[] = ['remainingCredit', 'creditLimit', 'dueDate', 'totalInterest']
  paidTransactionDisplayedColumns: string[] = ['id', 'transactionDate', 'description', 'amount']
  paymentPlanDisplayedColumns: string[] = ['description', 'amount', 'interestType', 'appliedInterest', 'interestAmount', 'penaltyInterestRate', 'transactionDate', 'creditType', 'installments', 'dueDate'];
  totalDataSource = new MatTableDataSource<any>(this.customerTransactions);
  paidTransactionDataSource = new MatTableDataSource<any>(this.paidTransactions);

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private transactionService: TransactionService, 
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const customerId = this.getCustomerId();
    this.getPendingTransactionsByCustomer(customerId);
    this.getTransactionsByCustomerDetail(customerId);
    this.creditLimit = this.getCustomerCreditLimit(customerId)
    this.dueDate = this.getCustomerDueDate(customerId);
    this.getPaidTransactions(customerId);
  }

  cerrar() {
    this.authService.logOut();
  }

  getCustomerId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }


  getCustomerCreditLimit(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe(customer => {
      this.creditLimit = customer.creditLimit;
      this.updateTotalDataSource();
    });
  }

  getCustomerDueDate(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe(customer => {
      this.dueDate = customer.monthlyPaymentDate;
      this.updateTotalDataSource();
    });
  }

  getPendingTransactionsByCustomer(customerId: number) {
    this.transactionService.getTransactions(customerId).subscribe(transactions => {
      this.customerTransactions = transactions.transactions.filter((transaction: any) => transaction.status === 'PENDING');
      this.dataSource.data = this.customerTransactions;
      
    });
  }

  getTransactionsByCustomerDetail(customerId: number) {
    this.transactionService.getTransactions(customerId).subscribe(detail => {
      this.creditUsed = detail.creditUsed;
      this.totalInterest = detail.totalInterest;
      this.totalDebt = detail.totalBalance;
      this.updateTotalDataSource();
    });
  }

  updateTotalDataSource() {
  if (this.creditUsed !== undefined && this.creditLimit !== undefined) {
    this.remainingCredit = this.creditLimit - this.creditUsed;
  }
  else {
    this.remainingCredit = this.creditLimit;
  }


  this.totalDataSource.data = [{
    creditUsed: this.creditUsed,
    creditLimit: this.creditLimit,
    dueDate: this.dueDate,
    totalInterest: this.totalInterest,
    remainingCredit: this.remainingCredit
  }];
  }

  paySelectedTransactions() {
    const selectedTransactions = this.selection.selected;
    selectedTransactions.forEach(transaction => {
      const transactionId = transaction.id;
      const transactionAmount = transaction.amount;
      console.log(`Enviando pago para la transacción ID: ${transactionId} con monto: ${transactionAmount}`);
      this.transactionService.postPaymentTransaction(this.getCustomerId(), transactionAmount, 'Pago para transacción ' + transactionId, 'PAYMENT', 0, 0, transactionId).subscribe(response => {
        console.log('Payment posted successfully', response);
        this.transactionService.updateTransaction(transactionId, 'PAID').subscribe(response => {
          console.log('Transaction updated successfully', response);
          this.getPendingTransactionsByCustomer(this.getCustomerId());
          this.getPaidTransactions(this.getCustomerId());
        });
      });
    })
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getPaidTransactions(customerId: number) {
    this.transactionService.getTransactions(customerId).subscribe((transactions: any) => {
      if (Array.isArray(transactions.transactions)) {
        this.paidTransactions = transactions.transactions.filter((transaction: any) => transaction.status === 'PAID');
      } else {
        console.error('transactions is not an array:', transactions);
      }
    });
  }

  

  openPaymentPlanDialog() {
    const pendingTransactions = this.customerTransactions.filter(transaction => transaction.status === 'PENDING');
    console.log(this.customerTransactions);

    let totalDebt = 0;
    let totalInterest = 0;

    pendingTransactions.forEach(transaction => {
      totalDebt += transaction.amount;
      totalInterest += transaction.interestAmount;
    })
    
    this.dialog.open(PaymentPlanDialogComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container', // Agregar una clase personalizada
      data: {
        transactions: pendingTransactions,
        totalDebt: totalDebt,
        totalInterest: totalInterest
      }
    });
  }

  @Output() totalSpendEmitter = new EventEmitter<any>();


}
