import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { OrderList, Orders } from '../../../models/order';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-admin-order',
    templateUrl: 'order-admin.component.html',
    styleUrl: 'order-admin.component.css',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule, FormsModule, DialogModule, RadioButtonModule],
})
export class OrderTableComponent {
    dialogVisible: boolean = false;
    displayDeleteDialog: boolean = false;
    selectedOrder: Orders;
    orders = OrderList.items;
    constructor() {}

    ngOnInit() {
        
    }

    getStatusLabel(status: number): string {
        if (status === 1) {
          return 'Đã hoàn thành';
        } else if (status === 0) {
          return 'Đang vận chuyển';
        } else {
          return 'Đang chuẩn bị';
        }
      }
    
      getStatusClass(status: number): string {
        if (status === 1) {
          return 'shipped';
        } else if (status === 0) {
          return 'pending';
        } else  {
          return 'prepared';
        } 
      }

      showUserDialog(order: Orders) {
        this.selectedOrder = { ...order };
        this.dialogVisible = true;
      }
    
      closeDialog() {
        this.dialogVisible = false;
        this.selectedOrder = null;
      }
    
      saveOrder() {
        // Logic to save the user data
        console.log('User data saved:', this.selectedOrder);
        this.closeDialog();
      }
    
      confirmDeleteOrder(order: any) {
        this.selectedOrder = order;
        this.displayDeleteDialog = true;
      }
    
      deleteOrder() {
        console.log('Deleting user:', this.selectedOrder);
        this.orders = this.orders.filter(c => c.id !== this.selectedOrder.id);
        this.displayDeleteDialog = false;
      }
    
}