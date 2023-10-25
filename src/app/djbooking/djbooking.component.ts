import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'api.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-djbooking',
  templateUrl: './djbooking.component.html',
  styleUrls: ['./djbooking.component.scss']
})
export class DjbookingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'eventname','djname', 'username', 'mobile', 'date','djcost','totalticket', 'totalamount'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private apiService: ApiService) { }
  isLoading = false;
  bookedList: Array<any> = []
  ngOnInit(): void {
    this.getDjBookedlist()
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDjBookedlist() {
    
    this.isLoading = true
    this.apiService.get('getBookedList').subscribe((response: any) => {
      
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          var array = {
            position: i + 1,
            eventName: response.message[i].eventName,
            djname : response.message[i].djName,
            userName: response.message[i].userName,
            mobileNumber: response.message[i].mobileNumber,
            bookedDate: response.message[i].bookedDate,
            djCost: response.message[i].djCost,
            totalTicket: response.message[i].totalTicket,
            totalAmount: response.message[i].totalAmount
          }

          this.bookedList.push(array)
        }
        
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.bookedList)
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
  ExportTOExcel()
  {
    // Create a new MatTableDataSource with all the data
    const fullDataSource = new MatTableDataSource(this.bookedList);

    // Set the paginator for the full data source
    fullDataSource.paginator = this.paginator;

    // Create a DatePipe instance
  const datePipe = new DatePipe('en-US');

    // Convert the data to an array of arrays
     const data = fullDataSource.data.map((item) => {
    return [
      item.position,
      item.eventName,
      item.djname,
      item.userName,
      item.mobileNumber,
      datePipe.transform(item.bookedDate, 'dd-MM-yyyy HH:mm:ss'),
      item.djCost,
      item.totalTicket,
      item.totalAmount
    ];
  });

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['No.', 'Event Name', 'DJ Name','User Name', 'Mobile Number','Booked Date','DJ Cost','Total Ticket', 'Total Amount'], ...data]);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Save the Excel file
    XLSX.writeFile(wb, 'DJBooking-List Excel.xlsx');
    
  }

}
export interface PeriodicElement {
  eventName: string
  djname:string
  userName: string
  bookedDate: Date
  totalAmount: number
  mobileNumber: number
  totalTicket: number
  djCost: number
}



