import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorterService {
  property: string = null;
  direction = 1;
  constructor() { }

  sort(collection: any[], prop: any) {
    this.property = prop;
    this.direction = (this.property === prop) ? this.direction * -1 : 1;
    collection.sort(this.sorter.bind(this));
  }

  sorter(a: any, b: any) {
    let aVal: any;
    let bVal: any;

    // Handle resolving complex properties such as 'state.name'
    if (this.property && this.property.includes('.')) {
      aVal = this.resolveProperty(this.property, a);
      bVal = this.resolveProperty(this.property, b);
    } else {
      aVal = a[this.property];
      bVal = b[this.property];
    }

    if (this.isString(aVal)) {
      aVal = aVal.trim().toUpperCase();
    }
    if (this.isString(bVal)) {
      bVal = bVal.trim().toUpperCase();
    }

    if (aVal === bVal) {
      return 0;
    }
    if (aVal > bVal) {
      return this.direction * -1;
    }
    return this.direction * 1;
  }

  resolveProperty<T, K extends keyof T>(path: string, obj: T): K {
    return path
      .split('.')
      .reduce(
        (prev: T, curr: string) => prev ? prev[curr] : undefined, obj || self);
  }

  isString(val: any): val is string {
    return val && (typeof val === 'string' || val instanceof String);
  }
}
