import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'api.service'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns: string[] = ['position', 'payment', 'active', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  commissionPer = new FormControl('');
  commissionAmt = new FormControl('');
  paymentValue = new FormControl('')
  commissionPerValidation :boolean = false;
  commissionAmtValidation :boolean = false;
  perValuevalidation :boolean = false;
  isLoading = false;
  message: any;
  typeSelected: any;
  paymentName: any = '';
  payments: Array<any> = [];
  form: FormGroup;
  submitted = false;
  editPaymentId: any = 0;
  paymentValidation : boolean = false;
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
      }
    );
    this.getpayment();
    this.getValue();
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getpayment() {
    this.isLoading = true
    this.apiService.get('getPayment').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          var array = {
            position: i + 1,
            // lastName
            payment: response.message[i].viewValue,
            paymentId: response.message[i].id,
            active: response.message[i].active == true ? 'Active' : 'In-Active'
          }
          this.payments.push(array)
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.payments)
        this.dataSource.paginator = this.paginator;
        this.isLoading = false
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
    this.commissionPerValidation = false
    this.commissionAmtValidation = false
    this.perValuevalidation = false
    if (this.commissionPer.value == '') {
     // this.showToasterError('Please Enter Commission Percentage.')
      this.commissionPerValidation = true
    } else if (this.commissionAmt.value == '') {
      //this.showToasterError('Please Enter Commission Amount.')
      this.commissionAmtValidation = true
    }else if (this.commissionPer.value > '100') {
      //this.showToasterError('Please Enter Commission Amount.')
      this.perValuevalidation = true
    } else {
      this.commissionPerValidation = false
    this.commissionAmtValidation = false
      this.isLoading = true
      let _comisionPer = this.commissionPer.value == '' ? 0 : this.commissionPer.value;
      let _comisionAmt = this.commissionAmt.value == '' ? 0 : this.commissionAmt.value;
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
  closeModal() {
    this.paymentValidation = false
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
  createPayment() {
    if (this.paymentName == '') {
      //this.showToasterError('Please Enter Payment.')
      this.paymentValidation = true
    }
    else {
      this.paymentValidation = false

      this.isLoading = true
      this.closeModal();
      const paymentValue = this.paymentName.replace(/[^\w]/g, '').toLowerCase();
      const param = {
        value: paymentValue,
        viewValue: this.paymentName,
        active: true
      }
      this.apiService.post('createPayment', param).subscribe((response: any) => {
        console.log(response.status)
        if (response.status != 'error') {
          this.paymentName = ''
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

  }
  updatePayment() {
    if (this.paymentName == '') {
      //this.showToasterError('Please Enter Payment.')
      this.paymentValidation = true
    }else{
      this.paymentValidation = false
      this.isLoading = true
      this.closeModal();
      const paymentValue = this.paymentName.replace(/[^\w]/g, '').toLowerCase();
      const param = {
        value: paymentValue,
        viewValue: this.paymentName,
        active: true,
        id: this.editPaymentId
      }
      this.apiService.post('updatePayment', param).subscribe((response: any) => {
        console.log(response.status)
        if (response.status != 'error') {
          this.paymentName = ''
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
    


  }
  editPayment(value: any) {
    this.paymentName = value.payment;
    this.editPaymentId = value.paymentId;
    this.paymentValidation = false

  }
  lockPayment(id: any) {
    this.isLoading = true
    var param = {
      id: id,
      active: false
    }
    this.apiService.post('lockPayment', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.paymentName = '';
        this.isLoading = false
        this.showToaster('Payment Inactived successfully !')
        setTimeout(() => {
          window.location.reload();
          //this.router.navigate(['settings']);
        }, 1000);
      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });

  }
  unlockPayment(id: any) {
    this.isLoading = true
    var param = {
      id: id,
      active: true
    }
    this.apiService.post('unlockPayment', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.isLoading = false
        this.showToaster(' Payment Actived successfully !')
        setTimeout(() => {
          window.location.reload();
          //this.router.navigate(['settings']);
        }, 1000);
      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });


  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  deletePayment(id) {
    this.isLoading = true
    let param = {
      id: id
    }
    this.apiService.post('deletePayment', param).subscribe((response: any) => {
      console.log(response.status)
      if (response.status != 'error') {
        this.isLoading = false
        this.showToaster('Deleted successfully !')
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.isLoading = false
        this.showToasterError(response.message)
      }

    });

  }
  addNew(){
    this.paymentName = '';
    this.editPaymentId = 0;
  }

}
export interface PeriodicElement {
  position: number;
  paymentId: number;
  payment: string;
  active: String

}
