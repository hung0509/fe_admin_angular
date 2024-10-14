import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { AccountService } from '../../../core/services/account.service';


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

    constructor(private messageService: MessageService, private router: Router, private accountService: AccountService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-building-columns',
                command: () => this.onItemClick('admin/dashboard')
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
              },{
                label: 'Đăng xuất',
                icon: 'pi pi-shopping-bag',
                command: () => {
                    this.accountService.logout();
                    this.router.navigateByUrl('/');
                }
              }
        ];
    }

    onItemClick(path: string) {
        this.router.navigate([path]);
      }


}
