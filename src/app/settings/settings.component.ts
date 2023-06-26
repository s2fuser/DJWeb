import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor() { }

  foods: Food[] = [
    {value: 'PayPal', viewValue: 'Pay Pal'}
  ];

  ngOnInit(): void {
    
  }

}
