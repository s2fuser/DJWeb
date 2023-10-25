import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'api.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  displayedColumns: string[] = ['position','name', 'mobile','eventname','paymenttype', 'date','totalamount'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  // ELEMENT_DATA: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
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
            mobile:response.message[i].PhoneNumber,
            totalamount:response.message[i].TotalPrice
          }
          
          this.payment.push(array)
        }
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.payment)
      this.dataSource.paginator = this.paginator;
      this.isLoading = false
     
    });
   
    
  }

  convertToNormalDateTime(isoDateTime: string): string {
    const isoDate = new Date(isoDateTime);
    const date = this.formatDate(isoDate);
    const time = this.formatTime(isoDate);

    return `${date} ${time}`;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    const normalHour = hours % 12 || 12;
    return `${normalHour}:${minutes} ${amPM}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ExportTOExcel()
  {
    // Create a new MatTableDataSource with all the data
    const fullDataSource = new MatTableDataSource(this.payment);

    // Set the paginator for the full data source
    fullDataSource.paginator = this.paginator;

    // Create a DatePipe instance
  const datePipe = new DatePipe('en-US');

    // Convert the data to an array of arrays
     const data = fullDataSource.data.map((item) => {
    return [
      item.position,
      item.name,
      item.mobile,
      item.eventname,
      item.paymenttype,
      datePipe.transform(item.date, 'dd-MM-yyyy HH:mm:ss'), // Format the date here
      item.totalamount
    ];
  });

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['No.', 'User Name', 'Mobile No', 'Event Name', 'Payment Type', 'Date & Time', 'Total Amount'], ...data]);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Save the Excel file
    XLSX.writeFile(wb, 'Payment-List Excel.xlsx');
    
  }

}
export interface PeriodicElement {

  position: number;
  paymenttype: string;
  eventname: string
  date: string;
  name: string;
  mobile: number;
  totalamount:number;
}
