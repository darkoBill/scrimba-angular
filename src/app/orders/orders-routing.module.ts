import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: 'orders/:id', component: OrdersComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OrdersRoutingModule {
}
