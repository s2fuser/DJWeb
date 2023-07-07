import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-toaster-error',
  templateUrl: './manual-toaster-error.component.html',
  styleUrls: ['./manual-toaster-error.component.scss']
})
export class ManualToasterErrorComponent implements OnInit {
  @Input() message: string;

  public isVisible: boolean = false;

  showToaster() {
    
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000); // Hide toaster after 3 seconds
  }
  constructor() { }
 
  ngOnInit(): void {
    
  }


}
