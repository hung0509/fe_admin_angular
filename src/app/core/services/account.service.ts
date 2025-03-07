import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, ReplaySubject } from 'rxjs';
import { User } from '../../models/user';
import { CartService } from './cart.service';
import { setUser, verify } from '../../models/verify';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  jwtHelper = new JwtHelperService();
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) { }

  getRoleFromToken(token: string): string {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken['role'] || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  login(model: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/Account/login`, model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUserSource(user);
          // const role = this.getRoleFromToken(user.token);
          // console.log(role);
          // localStorage.setItem('userRole', role);
          this.cartService.getUserCart().subscribe(response => {
          this.cartService.cartItems = response;
          })
          // this.cartService.getUserCart().subscribe((response) => {
          //   this.cartService.setCurrentCartItemsSource(response);
          // });
        }
        return response;
      })
    );
  }

  setPass(user: setUser) : Observable<any>{
    return this.http.post(`${this.baseUrl}/api/Account/set-pass`, user);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + '/api/Account/register', model).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUserSource(user);
        }
        return user;
      })
    )
  }

  encodeEmail(email: string): string {
    return btoa(email); // Mã hóa bằng Base64
  }

  resetPassword(email: string) {
    //  const model = { email: email };
      console.log(email);
      const encodedEmail = this.encodeEmail(email);
      return this.http.get(this.baseUrl + '/api/Mail/reset?encryptemail=' + encodedEmail);
  }

  verifyOtp(verify_obj: verify): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Mail/verify`, verify_obj);
  }

  getUserDetail() {

  }

  setCurrentUserSource(user: User) {
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.cartService.cartItems = [];
  }
}
