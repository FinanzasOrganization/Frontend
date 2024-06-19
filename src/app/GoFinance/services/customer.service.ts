import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private CUSTOMER_URL = 'http://localhost:8090/api/go-finance/v1/customer';

  constructor(private httpClient: HttpClient) { }

  postCustomer(name: string, address: string, phone: string, email: string, creditLimit: number, monthlyPaymentDate: Date, interestRate: number, penaltyInterestRate: number) {
    const userId = localStorage.getItem('user_id'); // Recuperar user_id del almacenamiento local
    return this.httpClient.post(this.CUSTOMER_URL + '/register/' + userId, {
      name, 
      address, 
      phone, 
      email, 
      creditLimit, 
      monthlyPaymentDate: monthlyPaymentDate.toISOString(), 
      interestRate, 
      penaltyInterestRate,
      accountStatus: 'ACTIVE'
    });
  }

  getCustomerById(customerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.CUSTOMER_URL}/${customerId}`);
  }
  
  getAllCustomers(): Observable<any> {
    return this.httpClient.get<any>(this.CUSTOMER_URL);
  }

  deleteCustomer(customerId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.CUSTOMER_URL}/${customerId}`);
  }

  updateCustomer(customerId: string, customerData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.CUSTOMER_URL}/${customerId}`, customerData);
  }

}
