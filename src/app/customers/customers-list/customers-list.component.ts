import { Component, OnInit, Input } from '@angular/core';

import { ICustomer } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  private _customers: ICustomer[] = [];
  @Input() get customers(): ICustomer[] {
    return this._customers;
  }

  set customers(value: ICustomer[]) {
    if (value) {
      this.filteredCustomers = this._customers = value;
      this.customerOrderTotal = this.calculateOrderTotal(this.filteredCustomers);
    }
  }

  filteredCustomers: ICustomer[] = [];
  customerOrderTotal: number;
  currencyCode = 'USD';

  constructor(private sorterService: SorterService) { }

  ngOnInit() {
  }

  filter(data: string) {
    this.filteredCustomers = data ?
      this.filterCustomers(this.customers, data) :
      this.customers;
    this.customerOrderTotal = this.calculateOrderTotal(this.filteredCustomers);
  }

  private calculateOrderTotal(filteredCustomers: ICustomer[]) {
    return filteredCustomers.reduce(
      (acc: number, customer: ICustomer) => acc + customer.orderTotal, 0);
  }

  private filterCustomers(customers: ICustomer[], data: string): ICustomer[] {
    const lowerCaseData = data.toLowerCase();
    return customers.filter(({ name, city, orderTotal }: ICustomer) => {
      return name.toLowerCase().includes(lowerCaseData) ||
        city.toLowerCase().includes(lowerCaseData) ||
        orderTotal.toString().includes(data);
    });
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredCustomers, prop);
  }
}
