import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PaymentComponent } from './payment/payment.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDJListComponent } from './user-dj-list/user-dj-list.component';
import { EventComponent } from './event/event.component';
import { DjbookingComponent } from './djbooking/djbooking.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [ 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule, 
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgFor,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PaymentComponent,
    SettingsComponent,
    UserDJListComponent,
    EventComponent,
    DjbookingComponent,
    LoginComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
