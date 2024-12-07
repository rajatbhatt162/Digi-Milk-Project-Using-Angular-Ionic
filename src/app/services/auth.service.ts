import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse, User } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private jwtHelper = new JwtHelperService();
  private authToken: string | null = null;
  private userRole: string | null = null;

  user$: Observable<firebase.User | null>;  // Observable for Firebase user state
  private apiUrl = 'http://localhost:3000/api/';  // Update with your API URL

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Initialize user observable
    this.user$ = this.afAuth.authState as Observable<firebase.User | null>;
  }

  login(username: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, { username, password }).pipe(
      tap(response => {
         if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        } else {
          sessionStorage.setItem('token', response.token);
        }
        // Store token and role if needed
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response['role']);
      })
    );
  }

 
  // // Additional methods to manage authentication state
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // Example login status check
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Example role retrieval method
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }



  // Function to log in using username and password
  // login(username: string, password: string, credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((response) => {
  //       this.authToken = response.token;
  //       this.userRole = response.role;
  //       localStorage.setItem('authToken', this.authToken!);
  //       this.router.navigate(['/dashboard']);
  //     }),
  //     catchError(this.handleError<any>('login'))
  //   );
  // }

  // Google login method using popup with force prompt for account selection
  signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  // Facebook login method
  signInWithFacebook(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  // Register logic
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post<any>(`${this.apiUrl}/registeration`, body).pipe(
      tap(response => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError<any>('register'))
    );
  }

  // Reset password logic
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email }).pipe(
      tap(response => {
        console.log('Password reset email sent successfully:', response);
        alert('Password reset link has been sent to your email.');
      }),
      catchError(this.handleError<any>('resetPassword'))
    );
  }

  // Logout
  // logout() {
  //   this.authToken = null;
  //   this.userRole = null;
  //   localStorage.removeItem('authToken');
  //   this.router.navigate(['/login']);
  // }

  // Check authentication status
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Get role from JWT
  getRole(): string | null {
    if (!this.userRole) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userRole = decodedToken.role;
      }
    }
    return this.userRole;
  }

  // Remember user (optional)
  // rememberMe(username: string) {
  //   localStorage.setItem('rememberedUser', username);
  // }

  // Error handler
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      alert(`${operation} failed. Please try again later.`);
      return of(result as T);
    };
  }

  // Get Firebase user state (optional)
  // getUser() {
  //   return this.afAuth.authState;
  // }
}
