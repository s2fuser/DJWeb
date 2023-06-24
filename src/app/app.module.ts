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

@NgModule({
  imports: [ 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PaymentComponent,
    SettingsComponent,
    UserDJListComponent,
    EventComponent,
    DjbookingComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
