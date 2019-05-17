import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from "@angular/common/http";
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { AddCardDialogComponent } from './pages/dialog/add-card-dialog/add-card-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    AddCardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgtUniversalModule,
    MatSliderModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
    
  ],
  entryComponents:[
    AddCardDialogComponent
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
