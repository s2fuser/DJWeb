import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-manual-toaster',
  templateUrl: './manual-toaster.component.html',
  styleUrls: ['./manual-toaster.component.scss']
})
export class ManualToasterComponent implements OnInit {

  @Input() message: string;
  @Input() type :string;
  public isVisible: boolean = false;

  showToaster() {
    this.message
    this.type
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 300000); // Hide toaster after 3 seconds
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
