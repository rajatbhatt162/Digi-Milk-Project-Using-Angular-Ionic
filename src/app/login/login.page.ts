import { Component } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { DarkModeService } from '../services/dark-mode';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider, UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  isDarkMode: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private darkModeService: DarkModeService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  async presentLoading(p0: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      duration: 2000,
    });
    await loading.present();
  }

  async login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.isLoading = true;
    await this.presentLoading('Logging in...');

    // Example validation (replace this with real authentication logic)
    if (this.username && this.password ) {
      this.errorMessage = '';
      this.router.navigate(['/dashboard']); // Navigate to the dashboard
    } else {
      this.errorMessage = 'Invalid username or password.';
    }

    this.isLoading = false;
  }

  googleSignIn() {
    this.authService.signInWithGoogle().then((userCredential) => {
      // Handle user credential
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.error('Google sign-in error:', error);
      this.errorMessage = 'Failed to sign in with Google.';
    });
  }

  async signInWithFacebook() {
    this.isLoading = true;
    try {
      const provider = new FacebookAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      const userCredential = result as unknown as UserCredential;  // Cast result to UserCredential
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        this.errorMessage = 'The popup was closed before authentication could complete.';
      } else {
        this.errorMessage = 'Failed to sign in with Facebook.';
      }
      console.error('Error signing in with Facebook:', error);
    } finally {
      this.isLoading = false;
    }
  }


  // Custom password validator function
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (
        !/[A-Z]/.test(value) ||    // Check for uppercase letter
        !/[0-9]/.test(value) ||    // Check for number
        !/[\W_]/.test(value) ||    // Check for special character
        value.length < 8           // Check for minimum length
      ) {
        return { invalidPassword: true };
      }
      return null;
    };
  }



  
}
