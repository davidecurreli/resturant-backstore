import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Customer {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Id: number;
  CreatedOn: string;
  UpdatedOn: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
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
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  isModalOpen = false;
  customerForm: FormGroup;
  deleteErrorMessage: string | null = null;

  constructor(
    private customersService: CustomersService,
    private formBuilder: FormBuilder
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customersService.getCustomers().subscribe(
      (response) => {
        this.customers = response.items;
        this.totalItems = this.customers.length;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  get pagedCustomers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.customers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.customerForm.reset();
  }

  createCustomer() {
    if (this.customerForm.valid) {
      this.customersService.createCustomer(this.customerForm.value).subscribe(
        () => {
          this.loadCustomers();
          this.closeModal();
        },
        (error) => {
          console.error('Error creating customer:', error);
        }
      );
    }
  }

  confirmDelete(customer: Customer) {
    if (confirm(`Are you sure you want to delete ${customer.FirstName} ${customer.LastName}?`)) {
      this.deleteCustomer(customer.Id);
    }
  }

  deleteCustomer(customerId: number) {
    this.customersService.deleteCustomer(customerId).subscribe(
      (success: boolean) => {
        if (success) {
          this.loadCustomers();
          this.deleteErrorMessage = null;
        } else {
          this.deleteErrorMessage = 'Deletion was not successful. Please try again.';
          setTimeout(() => {
            this.deleteErrorMessage = null;
          }, 3000);
        }
      },
      (error) => {
        console.error('Error deleting customer:', error);
        this.deleteErrorMessage = 'An error occurred while deleting the customer. Please try again.';
      }
    );
  }
}