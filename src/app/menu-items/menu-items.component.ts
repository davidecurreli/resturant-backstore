import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from './menu-items.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface MenuItem {
  ItemName: string;
  Description: string;
  Price: number;
  Category: string;
  Id: number;
  CreatedOn: string;
  UpdatedOn: string;
}

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
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
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  isModalOpen = false;
  menuItemForm: FormGroup;
  deleteErrorMessage: string | null = null;
  categories = ['Main Course', 'Salad', 'Pizza', 'Pasta', 'Dessert'];

  constructor(
    private menuItemsService: MenuItemsService,
    private formBuilder: FormBuilder
  ) {
    this.menuItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuItemsService.getMenuItems().subscribe(
      (response) => {
        this.menuItems = response.items;
        this.totalItems = this.menuItems.length;
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  get pagedMenuItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.menuItems.slice(startIndex, startIndex + this.pageSize);
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
    this.menuItemForm.reset();
  }

  createMenuItem() {
    if (this.menuItemForm.valid) {
      this.menuItemsService.createMenuItem(this.menuItemForm.value).subscribe(
        () => {
          this.loadMenuItems();
          this.closeModal();
        },
        (error) => {
          console.error('Error creating menu item:', error);
        }
      );
    }
  }

  confirmDelete(menuItem: MenuItem) {
    if (confirm(`Are you sure you want to delete ${menuItem.ItemName}?`)) {
      this.deleteMenuItem(menuItem.Id);
    }
  }

  deleteMenuItem(menuItemId: number) {
    this.menuItemsService.deleteMenuItem(menuItemId).subscribe(
      (success: boolean) => {
        if (success) {
          this.loadMenuItems();
          this.deleteErrorMessage = null;
        } else {
          this.deleteErrorMessage = 'Deletion was not successful. Please try again.';
          setTimeout(() => {
            this.deleteErrorMessage = null;
          }, 3000);
        }
      },
      (error) => {
        console.error('Error deleting menu item:', error);
        this.deleteErrorMessage = 'An error occurred while deleting the menu item. Please try again.';
      }
    );
  }
}