import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private TRANSACTION_URL = 'http://localhost:8090/api/go-finance/v1/transaction';

  constructor(private httpClient: HttpClient) { }

  postTransaction(customerId: number, amount: number, description: string, creditType: string, interestRate: number, installments: number, interestType: string) {
   
    return this.httpClient.post(this.TRANSACTION_URL + '/' + customerId, {amount, description, creditType, interestRate, installments, interestType});
  }

  getTransactions(id: number): Observable<any> {
    return this.httpClient.get<any>(this.TRANSACTION_URL + '/consolidate/' +  id);
  }

  getAllTransactions(): Observable<any> {
    return this.httpClient.get<any>(this.TRANSACTION_URL);
  }

  updateTransaction(transactionId: number, status: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(`${this.TRANSACTION_URL}/${transactionId}`, JSON.stringify(status), { headers });
  }

}
