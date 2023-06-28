import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-djbooking',
  templateUrl: './djbooking.component.html',
  styleUrls: ['./djbooking.component.scss']
})
export class DjbookingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'djname', 'eventname', 'date', 'mobile'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {

  position: number;
  djname: string;
  eventname: string
  date: string;
  mobile: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, djname: 'DJ bala', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8870677730 },
  { position: 2, djname: 'mohan', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9854123000 },
  { position: 3, djname: 'anand', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8754210323 },
  { position: 4, djname: 'usman', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9876543210 },
  { position: 5, djname: 'magi', eventname: 'Night life pondy', date: '07/07/2023', mobile: 7532147896 },
  { position: 6, djname: 'nithish', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9510257485 },
  { position: 7, djname: 'vijay', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9638527410 },
  { position: 8, djname: 'dhivakar', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8745120369 },
  { position: 9, djname: 'karthi', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8520741963 },
  { position: 10, djname: 'dharani', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9637418520 },
  { position: 11, djname: 'vicky', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9874563210 },
  { position: 12, djname: 'UPI', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8877663300 },
  { position: 13, djname: 'sundar', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9955112233 },
  { position: 14, djname: 'augustine', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8877441122 },
  { position: 15, djname: 'jeeva', eventname: 'Night life pondy', date: '07/07/2023', mobile: 7744118899 },
  { position: 16, djname: 'naren', eventname: 'Night life pondy', date: '07/07/2023', mobile: 8855220011 },
  { position: 17, djname: 'sudha', eventname: 'Night life pondy', date: '07/07/2023', mobile: 7744112233 },
  { position: 18, djname: 'vimal', eventname: 'Night life pondy', date: '07/07/2023', mobile: 9966330022 },
  { position: 19, djname: 'vishnu', eventname: 'Night life pondy', date: '07/07/2023', mobile: 887744551 },
  { position: 20, djname: 'vikky', eventname: 'Night life pondy', date: '07/07/2023', mobile: 7771234560 },
];