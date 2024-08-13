import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Order {
  CustomerID: number;
  OrderDate: string;
  TotalAmount: number;
  Status: string;
  Id: number;
  CreatedOn: string;
  UpdatedOn: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('tableRow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe(
      (response) => {
        this.orders = response.items;
        this.totalItems = this.orders.length;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  get pagedOrders() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.orders.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}