import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [PanelMenuModule, ToastModule],
  providers: [MessageService],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  items: MenuItem[];

    constructor(private messageService: MessageService, private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-building-columns',
                command: () => this.onItemClick('admin/dashboard')
              },
              {
                label: 'Danh mục',
                icon: 'pi pi-objects-column',
                command: () => this.onItemClick('admin/category')
              },
              {
                label: 'Sản phẩm',
                icon: 'pi pi-sign-out',
                command: () => this.onItemClick('admin/product')
              },
              {
                label: 'Kho hàng',
                icon: 'pi pi-warehouse',
                command: () => this.onItemClick('admin/warehouse')
              },
              {
                label: 'Tài khoản',
                icon: 'pi pi-user',
                command: () => this.onItemClick('admin/account')
              },
              {
                label: 'Đơn hàng',
                icon: 'pi pi-shopping-bag',
                command: () => this.onItemClick('admin/order')
              },
              {
                label: 'Voucher giảm giá',
                icon: 'pi pi-cloud',
                command: () => this.onItemClick('admin/voucher')
              },
        ];
    }

    onItemClick(path: string) {
        this.router.navigate([path]);
      }


}
