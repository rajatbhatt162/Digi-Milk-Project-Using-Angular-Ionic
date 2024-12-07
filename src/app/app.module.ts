// declarations
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './shared/dashboard-layout/dashboard-layout.component';  // Import your component
import { ExcelImportComponent } from './components/excel-import/excel-import.component';
import { UnauthorizedComponent } from './non_authorization/unauthorized/unauthorized.component';




// imports
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha'; // Import RecaptchaModule
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// providers
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ExcelImportService } from './services/excel-import.service';
import { RouteReuseStrategy } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';

@NgModule({
  declarations: [AppComponent, DashboardLayoutComponent, ExcelImportComponent, UnauthorizedComponent,SideMenuComponent  
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, NgxCaptchaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, 

  ],
  providers: [provideHttpClient(), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    , ExcelImportService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { } 
