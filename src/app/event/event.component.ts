import { Component, OnInit } from '@angular/core';
import { ApiService } from 'api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  isLoading = false;
  startDate: any;
  startTime: any;
  address: any;
  name: any;
  about: any;
  cost: any;
  eventArray: Array<any> = [];
  ngOnInit(): void {
    this.getEvent()
  }

  getEvent() {
    const ImgapiUrl = this.apiService.ImgapiUrl;
    this.isLoading = true
    this.apiService.get('getEvents').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          var array = {
            Event_name: response.message[i].Event_name,
            Event_startDate: response.message[i].Event_startDate,
            Event_startTime: response.message[i].Event_startTime,
            Event_address: response.message[i].Event_address,
            Event_about: response.message[i].Event_about,
            Event_cost: response.message[i].Event_cost,
            Event_img: ImgapiUrl + response.message[i].Event_image
          }

          this.eventArray.push(array)
        }
      }
      this.eventArray
      this.isLoading = false

    });
  }

}
