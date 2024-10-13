import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ProductCollectionComponent } from './features/products/product-collection/product-collection.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { ResetPasswordComponent } from './features/authentication/reset-password/reset-password.component';
import { CartDetailComponent } from './features/cart/cart-detail/cart-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './core/guards/admin.guard';
import { AccountDetailComponent } from './features/account/account-detail/account-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { PaymentResultComponent } from './features/payment-result/payment-result.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { verifyComponent } from './features/authentication/verify/verify.component';
import { SetPassComponent } from './features/authentication/set-password/set-password.component';
import { TableCustomersComponent } from './admin/features/user/user.component';
import { AdminDashboardComponent } from './admin/features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailComponent },
  { path: 'collections/:category', component: ProductCollectionComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'cart', component: CartDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/payment-result', component: PaymentResultComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
  {
    path: 'account',
    component: AccountDetailComponent,
    canActivate: [authGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'account/reset-password', component: ResetPasswordComponent },
  { path: 'account/verify', component: verifyComponent },
  { path: 'account/set-pass', component: SetPassComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/account', component: TableCustomersComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
