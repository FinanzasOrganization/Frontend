import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../services/auth-services/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../../services/transaction.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerService } from '../../../services/customer.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [MatTableModule, MatCalendar, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.css'
})
export class AccountBalanceComponent implements OnInit {
  customerTransactions: any[] = []
  paidTransactions: any[] = []
  totalBalance: any;
  creditLimit: any;
  dueDate: any;
  totalInterest: any;
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>(this.customerTransactions);
  displayedColumns: string[] = ['id', 'transactionDate', 'description', 'amount', 'interestAmount', 'status', 'select']
  totalDisplayedColumns: string[] = ['totalBalance', 'creditLimit', 'dueDate', 'totalInterest']
  paidTransactionDisplayedColumns: string[] = ['id', 'transactionDate', 'description', 'amount']
  totalDataSource = new MatTableDataSource<any>(this.customerTransactions);
  paidTransactionDataSource = new MatTableDataSource<any>(this.paidTransactions);

  constructor(private apiService: ApiserviceService, 
    private router: Router, 
    private dialog: MatDialog, 
    private transactionService: TransactionService, 
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    const customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.getTransactionsByCustomer(customerId);
    this.getTransactionsByCustomerDetail(customerId);
    this.creditLimit = this.getCustomerCreditLimit(customerId)
    this.dueDate = this.getCustomerDueDate(customerId);
    this.getPaidTransactions(customerId);
  }

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

  getTransactionsByCustomer(customerId: number) {
    this.transactionService.getTransactions(customerId).subscribe(transactions => {
      this.customerTransactions = transactions.transactions;
      this.dataSource.data = this.customerTransactions;
    });
  }

  getTransactionsByCustomerDetail(customerId: number) {
    this.transactionService.getTransactions(customerId).subscribe(detail => {
      this.totalBalance = detail.totalBalance;
      this.totalInterest = detail.totalInterest;
      this.updateTotalDataSource();
    });
  }

  updateTotalDataSource() {
    this.totalDataSource.data = [{
      totalBalance: this.totalBalance,
      creditLimit: this.creditLimit,
      dueDate: this.dueDate,
      totalInterest: this.totalInterest
    }];
  }

  paySelectedTransactions() {
    const selectedTransactions = this.selection.selected;
    selectedTransactions.forEach(transaction => {
      let updateData = "PAID";
      this.transactionService.updateTransaction(transaction.id, updateData).subscribe();
    });
    this.selection.clear();
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


}
