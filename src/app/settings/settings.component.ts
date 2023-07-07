import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'api.service'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';

interface payment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private spinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { }
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  @ViewChild('toastererror') toastererror!: ManualToasterErrorComponent;
  commissionPer = new FormControl('');
  commissionAmt = new FormControl('');
  paymentValue = new FormControl('')
  isLoading = false;
  message: any;
  typeSelected: any;
  payments: payment[] = [];
  form: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        //   username: [
        //     '',
        //     [
        //       Validators.required,
        //       Validators.minLength(6),
        //       Validators.maxLength(20)
        //     ]
        //   ],
        //   email: ['', [Validators.required, Validators.email]],
        //   password: [
        //     '',
        //     [
        //       Validators.required,
        //       Validators.minLength(6),
        //       Validators.maxLength(40)
        //     ]
        //   ],
        //   confirmPassword: ['', Validators.required],
        //   acceptTerms: [false, Validators.requiredTrue]
        // },
        // {
        //   validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.getpayment();

    this.getValue();
  }

  getpayment() {
    this.isLoading = true
    this.apiService.get('getPayment').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          this.payments.push(response.message[i])
        }
        this.payments
      }
    });

  }
  getValue() {


    this.apiService.get('getCommission').subscribe((response: any) => {
      if (response.status == 'sucess') {
        this.commissionPer.setValue(response.message[0].commission_per);
        this.commissionAmt.setValue(response.message[0].commission_amt);
        this.paymentValue.setValue(response.message[0].payment_method);

      }
      this.isLoading = false

    });

  }
  save() {

    this.isLoading = true
    let _comisionPer = this.commissionPer.value;
    let _comisionAmt = this.commissionAmt.value;
    const param = {
      commission_per: _comisionPer,
      commission_amt: _comisionAmt
    }

    this.apiService.post('saveCommision', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {

        this.isLoading = false
        this.showToaster('Saved Successfuly.')
        setTimeout(() => {
          window.location.reload();
        }, 2000);

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
  paymentSave() {
    this.isLoading = true
    let _paymentMethod = this.paymentValue.value;

    const param = {
      payment_method: _paymentMethod,

    }

    this.apiService.post('savePayment', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {

        this.isLoading = false
        this.showToaster('Saved Successfuly.')
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      }

      else {

        this.isLoading = false
        this.showToasterError('Something Went Wrong.')
      }
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
