import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {
  ICustomer,
  IOrder
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'assets/';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http
      .get<ICustomer[]>(`${this.baseUrl}customers.json`)
      .pipe(catchError(this.handleError));
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.http
      .get<ICustomer[]>(`${this.baseUrl}customers.json`)
      .pipe(
        map(customers => this.getCustomerForId(customers, id)),
        catchError(this.handleError)
      );
  }

  private getCustomerForId(customers: ICustomer[], id: number): ICustomer | null {
    const [customer] = customers.filter((c: ICustomer) => c.id === id);
    return customer || null;
  }

  getOrders(customerId: number): Observable<IOrder[]> {
    return this.http
      .get<IOrder[]>(`${this.baseUrl}orders.json`)
      .pipe(
        map(orders => this.getOrdersForCustomerId(orders, customerId)),
        catchError(this.handleError)
      );
  }

  private getOrdersForCustomerId(orders: IOrder[], customerId: number): IOrder[] {
    return orders.filter((order: IOrder) => order.customerId === customerId);
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node server error');
  }
}
