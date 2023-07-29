import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'api.service';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-djlist',
  templateUrl: './djlist.component.html',
  styleUrls: ['./djlist.component.scss']
})
export class DjlistComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'email', 'mobileNo', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  @ViewChild('toastererror') toastererror!: ManualToasterErrorComponent;
  userList: Array<any> = []
  isLoading: boolean = false
  username: any;
  useremali: any;
  usermobile: any;
  value: any;
  userId: any;
  message: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private apiService: ApiService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.getUser();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUser() {
    this.isLoading = true
    this.apiService.get('getdjUser').subscribe((response: any) => {

      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          var array = {
            position: i + 1,
            // lastName
            userid: response.message[i].dj_userid,
            name: response.message[i].dj_firstName,
            email: response.message[i].dj_emailAddress,
            mobileNo: response.message[i].dj_mobileNumber,
            isActive: response.message[i].dj_isActive,
            userstatus: response.message[i].dj_isActive == true ? 'Active' : 'In-Active'
          }

          this.userList.push(array)
        }

      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.userList)
      this.dataSource.paginator = this.paginator;
      this.isLoading = false

    });
  }
  edit(id: any) {
    let userlistFilter: Array<any>
    userlistFilter = this.userList.filter((e) => e.userid == id)
    this.username = userlistFilter[0].name;
    this.useremali = userlistFilter[0].email;
    this.usermobile = userlistFilter[0].mobileNo;
    this.userId = userlistFilter[0].userid;

    console.log(userlistFilter)
  }
  updateUser() {
    if(this.username == ''){
      this.showToasterError('Please enter Username.')
    }else if(this.useremali == ''){
      this.showToasterError('Please enter Useremail')
    }else if(this.usermobile  == ''){
      this.showToasterError('Please enter MobileNo')
    }else{
      this.isLoading = true
      this.closeModal()
      let param = {
        name: this.username,
        email: this.useremali,
        mobileNo: this.usermobile,
        userid: this.userId
      }
      this.apiService.post('updatedjUser', param).subscribe((response: any) => {
        console.log(response.status)
        if (response.status != 'error') {
  
          this.showToaster('Update successfully !')
          this.isLoading = false
          setTimeout(() => {
            this.reloadWindow()
            //this.router.navigate(['settings']);
          }, 2000);
  
  
  
        } else {
          this.isLoading = false
          this.showToasterError(response.message)
        }
  
      });
    }
   

  }
  deleteUser(id: any) {
    this.isLoading = true
    let param = {
      userid: id
    }
    this.apiService.post('deletedjUser', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.isLoading = false
        this.showToaster('Deleted successfully !')
        setTimeout(() => {
          this.reloadWindow()
          //this.router.navigate(['settings']);
        }, 2000);



      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });

  }
  lockUser(id: any) {
    this.isLoading = true
    var param = {
      userid: id,
      isActive: false
    }
    this.apiService.post('lockdjUser', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.isLoading = false
        this.showToaster('Dj-User Locked successfully !')
        setTimeout(() => {
          this.reloadWindow()
          //this.router.navigate(['settings']);
        }, 1000);
      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });

  }
  unlockUser(id: any) {
    this.isLoading = true
    var param = {
      userid: id,
      isActive: true
    }
    this.apiService.post('unlockdjUser', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.isLoading = false
        this.showToaster('Dj-User Unlocked successfully !')
        setTimeout(() => {
          this.reloadWindow()
          //this.router.navigate(['settings']);
        }, 1000);
      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });


  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  closeModal() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
      document.body.classList.remove('modal-open');
    }
  }
  showToaster(message: any) {
    this.message = message
    this.toaster.showToaster()
  }
  showToasterError(message: any) {
    this.message = message
    this.toastererror.showToaster()
  }
  reloadWindow() {
    window.location.reload();
  }

}
export interface PeriodicElement {
  position: number;
  userid: number
  name: string;
  email: string;
  mobileNo: string;
  userstatus: string;
}
