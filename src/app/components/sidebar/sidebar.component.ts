import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/settings', title: 'Settings',  icon:'settings', class: '' },
    { path: '/payment', title: 'Payment',  icon:'payment', class: '' },
    { path: '/user-list', title: 'User list',  icon:'assignmentnd', class: '' },
    { path: '/djuser-list', title: 'DJ-User list',  icon:'assignmentnd', class: '' },
    { path: '/event', title: 'Event',  icon:'event', class: '' },
    { path: '/dj-booking', title: 'DJ Bookings',  icon:'note', class: '' },
    { path: '/faq-aboutus', title: 'FAQ & About Us',  icon:'note', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
