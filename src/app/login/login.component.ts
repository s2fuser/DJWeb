import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';
import { AuthService } from 'auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  @ViewChild('toastererror') toastererror!: ManualToasterErrorComponent;
  userName: any = '';
  password: any = '';
  message: any;
  type: any;
  isLoading = false;

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
  }
  ngOnInit(): void {
  }
  login() {
    this.isLoading = true
    const param = {
      emailId: this.userName,
      password: this.password
    }
    this.apiService.post('login', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        localStorage.setItem('userDetail', response.message);
        this.authService.login();
        this.showToaster('Login successfully !')
        // this.isLoading = false
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);



      } else {
        this.isLoading = false
        this.showToasterError(response.message)
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

