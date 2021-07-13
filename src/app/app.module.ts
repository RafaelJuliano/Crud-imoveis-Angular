import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FormTesteComponent } from './teste/form-teste/form-teste.component';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PropertyFormComponent } from './shared/property-form/property-form.component';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    FormTesteComponent,
    ErrorMsgComponent,
    LoginComponent,
    HomeComponent,
    PropertyFormComponent,
    CreatePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
