import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: any;
  isLoading: boolean = false
  eventCount: number = 0;
  eventCountstop: any
  DjBookedCount: number = 0;
  DjBookedCountstop: any;
  djuserCount: number = 0;
  djuserCountstop: any;
  userCount: number = 0;
  userCountstop: any;
  currentWeekDate: Array<any> = [];
  djBookedEvent: Array<any> = [];
  djBookedfiltered: Array<any> = [];
  paymentsFiltered: Array<any> = [];
  eventsFiltered: Array<any> = [];
  bookEventChart: Array<any> = [];
  EventChart: Array<any> = [];
  payments: Array<any> = [];
  events: Array<any> = [];
  paymentChart: Array<any> = [];
  totalPriceSum: any;
  totalpayment:number = 0;
  constructor(private apiService: ApiService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    this.isLoading = true
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - currentDayOfWeek + 1);
    // Populate the currentWeek array with dates from Monday to Sunday
    for (let i = 0; i < 7; i++) {
      const day = new Date(mondayDate);
      day.setDate(mondayDate.getDate() + i);
      const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
      const fulldate = new Date(day)
      const date = fulldate.getDate();
      const addedMonth = fulldate.getMonth() + 1
      const month = addedMonth < 9 ? '0' + addedMonth : addedMonth;
      const year = fulldate.getFullYear();
      const fullDateFormat = year + '-' + month + '-' + date
      this.currentWeekDate.push({ date: fullDateFormat, day: dayOfWeek });
    }
    this.getDashboard()
  }
  getDashboard() {
    var paymentValue=[]
   
    this.isLoading = true
    this.apiService.get('getdashboard').subscribe((response: any) => {

      if (response.status == 'sucess') {
        this.DjBookedCount = response.message.DjBookedCount;
        this.djuserCount = response.message.djuserCount;
        this.eventCount = response.message.eventCount;
        this.userCount = response.message.userCount;
        this.djBookedEvent = response.message.bookedEvents;
        this.payments = response.message.payments;
        this.events = response.message.events;
        for (let i = 0; i < this.djBookedEvent.length; i++) {
          const fulldate = new Date(this.djBookedEvent[i].createdAt)
          const date = fulldate.getDate();
          const addedMonth = fulldate.getMonth() + 1
          const month = addedMonth < 9 ? '0' + addedMonth : addedMonth;
          const year = fulldate.getFullYear();
          const fullDateFormat = year + '-' + month + '-' + date
          this.djBookedEvent[i].date = fullDateFormat
        }
        for (let i = 0; i < this.payments.length; i++) {
          const fulldate = new Date(this.payments[i].PaymentDateTime)
          const date = fulldate.getDate();
          const addedMonth = fulldate.getMonth() + 1
          const month = addedMonth < 9 ? '0' + addedMonth : addedMonth;
          const year = fulldate.getFullYear();
          const fullDateFormat = year + '-' + month + '-' + date
          this.payments[i].date = fullDateFormat
        }
        for (let i = 0; i < this.events.length; i++) {
          const fulldate = new Date(this.events[i].createdAt)
          const date = fulldate.getDate();
          const addedMonth = fulldate.getMonth() + 1
          const month = addedMonth < 9 ? '0' + addedMonth : addedMonth;
          const year = fulldate.getFullYear();
          const fullDateFormat = year + '-' + month + '-' + date
          this.events[i].date = fullDateFormat
        }
        for (let i = 0; i < this.currentWeekDate.length; i++) {
          this.djBookedfiltered = this.djBookedEvent.filter((e) => e.date == this.currentWeekDate[i].date)
          this.bookEventChart.push(this.djBookedfiltered.length)

          this.paymentsFiltered= this.payments.filter((e)=>e.date == this.currentWeekDate[i].date)
          this.paymentChart.push(this.paymentsFiltered.length)
          paymentValue.push(this.paymentsFiltered)

          this.eventsFiltered =this.events.filter((e)=>e.date == this.currentWeekDate[i].date)
          this.EventChart.push(this.eventsFiltered.length)
      
        }
        for(let i = 0;i<paymentValue.length ;i++){
          if(paymentValue[i].length > 0){
            this.totalPriceSum = paymentValue[i].reduce((accumulator, currentCardDetails) => {
              const totalPrice = parseFloat(currentCardDetails.TotalPrice);
              return accumulator + totalPrice;
            }, 0);
            this.totalpayment += this.totalPriceSum
          }
        }
        
        
      }
      this.isLoading = false
      this.firstChart()
      this.secondChart()
      this.thirdChart()
    });
  }
  firstChart() {
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        this.bookEventChart
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }
  secondChart(){
    var datawebsiteViewsChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        this.paymentChart

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  thirdChart(){
    const dataCompletedTasksChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        this.EventChart
      ]
    };
    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }
  
}
