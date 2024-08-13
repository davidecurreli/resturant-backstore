import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';

interface Order {
  CustomerID: number;
  OrderDate: string;
  TotalAmount: number;
  Status: string;
  Id: number;
  CreatedOn: string;
  UpdatedOn: string;
}

interface OrderDetailItem {
  itemName: string;
  description: string;
  price: number;
  category: string;
  id: number;
  createdOn: string;
  updatedOn: string;
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
  selectedOrderDetails: OrderDetailItem[] | null = null;
  isModalOpen = false;
  isStatusModalOpen = false;
  selectedOrderId: number | null = null;
  currentSelectedOrderStatus: string | null = null;
  newStatus: string = '';
  statusOptions = ['Pending', 'In Progress', 'Completed'];

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

  openOrderDetails(orderId: number) {
    this.ordersService.getOrderDetails(orderId).subscribe(
      (response) => {
        this.selectedOrderDetails = response.items;
        this.isModalOpen = true;
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedOrderDetails = null;
  }

  openStatusModal(orderId: number, orderStatus: string) {
    this.selectedOrderId = orderId;
    this.isStatusModalOpen = true;
    this.currentSelectedOrderStatus = orderStatus;
  }

  closeStatusModal() {
    this.isStatusModalOpen = false;
    this.selectedOrderId = null;
    this.newStatus = '';
  }

  updateOrderStatus() {
    if (this.selectedOrderId && this.newStatus) {
      this.ordersService.updateOrderStatus(this.selectedOrderId, this.newStatus).subscribe(
        () => {
          console.log('Order status updated successfully');
          this.loadOrders(); // Reload orders to reflect the change
          this.closeStatusModal();
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    }
  }
}