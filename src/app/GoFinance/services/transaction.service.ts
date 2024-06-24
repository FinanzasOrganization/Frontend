import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private TRANSACTION_URL = 'http://localhost:8080/api/go-finance/v1/transaction';

  constructor(private httpClient: HttpClient) { }

  postTransaction(customerId: number, amount: number, description: string, creditType: string, transactionType: string, interestRate: number, installments: number, interestType: string, tasaType: string, capitalizacionType: string) {
   
    return this.httpClient.post(this.TRANSACTION_URL + '/' + customerId, {amount, description, creditType, transactionType, interestRate, installments, interestType, tasaType, capitalizacionType});
  }

  postPaymentTransaction(customerId: number, amount: number, description: string, transactionType: string, interestRate: number, installments: number, purchaseTransactionId: number) {
    return this.httpClient.post(this.TRANSACTION_URL + '/' + customerId, {amount, description, transactionType, interestRate, installments, purchaseTransactionId});
  }

  getTransactions(id: number): Observable<any> {
    return this.httpClient.get<any>(this.TRANSACTION_URL + '/consolidate/' +  id);
  }

  getAllTransactions(): Observable<any> {
    const clientId = localStorage.getItem('user_id');
    return this.httpClient.get<any>(`${this.TRANSACTION_URL}/client/${clientId}`);
  }

  updateTransaction(transactionId: number, status: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(`${this.TRANSACTION_URL}/${transactionId}`, JSON.stringify(status), { headers });
  }

}
