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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { ManualToasterComponent } from './components/manual-toaster/manual-toaster.component';
import { LoadingComponent } from './loading';
import { ManualToasterErrorComponent } from './components/manual-toaster-error/manual-toaster-error.component';
import { DjlistComponent } from './djlist/djlist.component';
import { FaqAboutasComponent } from './faq-aboutas/faq-aboutas.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {MatIconModule} from '@angular/material/icon';
import { DjbookingListComponent } from './djbooking-list/djbooking-list.component';

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
    MatSlideToggleModule,
    NgFor,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    CKEditorModule ,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PaymentComponent,
    SettingsComponent,
    UserDJListComponent,
    EventComponent,
    DjbookingComponent,
    LoginComponent,
    ManualToasterComponent,
    LoadingComponent,
    ManualToasterErrorComponent,
    DjlistComponent,
    FaqAboutasComponent,
    DjbookingListComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
