import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { PaymentComponent } from 'app/payment/payment.component';
import { DjbookingComponent } from 'app/djbooking/djbooking.component';
import { EventComponent } from 'app/event/event.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { UserDJListComponent } from 'app/user-dj-list/user-dj-list.component';
import { LoginComponent } from 'app/login/login.component';
import { DjlistComponent } from 'app/djlist/djlist.component';
import { AuthGuard } from 'auth.guard';
import { FaqAboutasComponent } from 'app/faq-aboutas/faq-aboutas.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'dj-booking', component: DjbookingComponent },
    { path: 'event', component: EventComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'user-list', component: UserDJListComponent },
    { path: 'djuser-list', component: DjlistComponent },
    { path: 'faq-aboutus', component: FaqAboutasComponent },
    // { path: 'login',          component: LoginComponent },
];
