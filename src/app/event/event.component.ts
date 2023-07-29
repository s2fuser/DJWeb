import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'api.service';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  @ViewChild('toastererror') toastererror!: ManualToasterErrorComponent;
  constructor(private apiService: ApiService) { }
  isLoading = false;
  searchQuery: string = '';
  startDate: any;
  startTime: any;
  address: any;
  name: any;
  about: any;
  cost: any;
  eventArray: Array<any> = [];
  filteredEvents: any[] = [];
  message: any;
  ngOnInit(): void {
    this.getEvent()
    this.filteredEvents = this.eventArray;
  }
  filterEvents() {
    this.filteredEvents = this.eventArray.filter(event => {
      return event.Event_name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
  getEvent() {
    const ImgapiUrl = this.apiService.ImgapiUrl;
    this.isLoading = true
    this.apiService.get('getEvents').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.Events.length; i++) {
          var djNamefilter = response.message.djUsers.filter((x) => x.dj_userid == response.message.Events[i].Event_createdBy);

          var array = {
            Event_id: response.message.Events[i].Event_id,
            Event_name: response.message.Events[i].Event_name,
            Event_startDate: response.message.Events[i].Event_startDate,
            Event_startTime: response.message.Events[i].Event_startTime,
            Event_address: response.message.Events[i].Event_address,
            Event_about: response.message.Events[i].Event_about,
            Event_cost: response.message.Events[i].Event_cost,
            Event_img: ImgapiUrl + response.message.Events[i].Event_image,
            Event_djName: djNamefilter.length > 0 ? djNamefilter[0].dj_firstName : ''
          }

          this.eventArray.push(array)
        }
      }
      this.eventArray
      this.isLoading = false

    });
  }
  deleteEvent(EventID: any) {
    this.isLoading = true
    const param = {
      EventID: EventID
    }
    this.apiService.post('deleteEvent', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        if(response.message == 'deleteSuccessfully'){
          this.isLoading = false
          this.showToaster('Deleted Successfuly.')
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }else{
          this.isLoading = false
          this.showToasterError('Booked Event Exist.')
        }
      }
      else {
        this.isLoading = false
        this.showToasterError('Something Went Wrong.')
      }
    });
  }
  showToaster(message: any) {
    this.message = message
    this.toaster.showToaster()
  }
  showToasterError(message: any) {
    this.message = message
    this.toastererror.showToaster()
  }

}
