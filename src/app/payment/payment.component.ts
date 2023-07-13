import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  displayedColumns: string[] = ['position','name', 'mobile','eventname','paymenttype', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  // ELEMENT_DATA: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  payment: Array<any> = []
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private apiService: ApiService) { }
  isLoading = false;

  ngOnInit(): void {
    this.getPayment()
  }

  getPayment() {
    this.isLoading = true
    this.apiService.get('getPaymentList').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for(let i=0;i< response.message.length ; i++){
          var array={
            position: i+1, 
            paymenttype: response.message[i].PaymentMethod, 
            eventname: response.message[i].EventName, 
            date: response.message[i].PaymentDateTime, 
            name: response.message[i].Name, 
            mobile:response.message[i].PhoneNumber
          }
          
          this.payment.push(array)
        }
      }
      this.payment
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.payment)
      this.isLoading = false
     
    });
   
    
  }

}
export interface PeriodicElement {

  position: number;
  paymenttype: string;
  eventname: string
  date: string;
  name: string;
  mobile: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   // { position: 1, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'bala', mobile: 8870677730 },
//   // { position: 2, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'mohan', mobile: 9854123000 },
//   // { position: 3, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'anand', mobile: 8754210323 },
//   // { position: 4, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'magi', mobile: 9876543210 },
//   // { position: 5, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'usman', mobile: 7532147896 },
//   // { position: 6, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'nithish', mobile: 9510257485 },
//   // { position: 7, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'dhivakar', mobile: 9638527410 },
//   // { position: 8, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'vijay', mobile: 8745120369 },
//   // { position: 9, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'vicky', mobile: 8520741963 },
//   // { position: 10, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'karthi', mobile: 9637418520 },
//   // { position: 11, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'dharani', mobile: 9874563210 },
//   // { position: 12, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'teejay', mobile: 8877663300 },
//   // { position: 13, paymenttype: 'Paypal', eventname: 'Night life pondy', date: '07/07/2023', name: 'sundar', mobile: 9955112233 },
//   // { position: 14, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'augustine', mobile: 8877441122 },
//   // { position: 15, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'jeeva', mobile: 7744118899 },
//   // { position: 16, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'naren', mobile: 8855220011 },
//   // { position: 17, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'sudha', mobile: 7744112233 },
//   // { position: 18, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'vimal', mobile: 9966330022 },
//   // { position: 19, paymenttype: 'Cash', eventname: 'Night life pondy', date: '07/07/2023', name: 'vishnu', mobile: 887744551 },
//   // { position: 20, paymenttype: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', name: 'vikky', mobile: 7771234560 },
// ];
