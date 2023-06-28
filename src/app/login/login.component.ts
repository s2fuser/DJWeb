import { Component, ViewChild,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  userName: any = '';
  password: any = '';
  message:any;
  type:any;

  constructor(private router: Router, private apiService: ApiService) { 
  }
  ngOnInit(): void {
  }
  login() {
    const param = {
      emailId: this.userName,
      password: this.password
    }
    this.apiService.post('login', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        localStorage.setItem('userDetail', response.message);
        if (response.message.loginToken != '' && response.message.loginToken != null && response.message.loginToken != undefined) {
          this.message='Login Successfully !'
          this.type = response.status
          this.toaster.showToaster()
          this.router.navigate(['/dashboard']);
        }

      } else {
        this.message= response.message
        this.type = response.status
        this.toaster.showToaster()
      }

    });
  }
}

