import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/shared/modal/modal.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { LoaderComponent } from './components/shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateContactComponent,
    HeaderComponent,
    ModalComponent,
    AlertComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
