import {  Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { FooterComponent } from "./core/components/footer/footer.component";
import { AccountService } from './core/services/account.service';
import { User } from './models/user';
import { CartService } from './core/services/cart.service';
import { CartItem } from './models/cart';
import { CartSidebarComponent } from './features/cart/cart-sidebar/cart-sidebar.component';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin/core/admin-sidebar/admin-sidebar.component';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, CartSidebarComponent, CommonModule, AdminSidebarComponent, SplitterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  cartItems: CartItem[] = [];
  isAdmin: boolean = false;
  role: String;
  @Input() show: boolean = false;

  constructor(private accountService: AccountService, private cartService: CartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setCurrentUser();
    this.isAdmin = (this.role === "Admin")
    
    this.navigateBasedOnRole();
    // this.loadCart();
    // this.setCurrentCartItems();
  }



navigateBasedOnRole() {
  if (this.role === "Admin") {
    this.isAdmin = true;
    this.router.navigate(['/admin/home']);
  } else {
    this.isAdmin = false;
    // this.router.navigate(['/']);
  }
}
  toggleCartSidebar() {
    this.show = !this.show;
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUserSource(user);
    if(user) {
      this.role = this.accountService.getRoleFromToken(user.token);
      this.cartService.getUserCart().subscribe(response => {
        this.cartService.cartItems = response;
      })
    }
  }


  loadCart() {
    
  }

  setCurrentCartItems() {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems'));
    this.cartService.setCurrentCartItemsSource(cartItems);
  }
}
