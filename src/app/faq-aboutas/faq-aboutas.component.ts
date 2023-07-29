import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManualToasterComponent } from 'app/components/manual-toaster/manual-toaster.component';
import { ManualToasterErrorComponent } from 'app/components/manual-toaster-error/manual-toaster-error.component';


@Component({
  selector: 'app-faq-aboutas',
  templateUrl: './faq-aboutas.component.html',
  styleUrls: ['./faq-aboutas.component.scss']
})
export class FaqAboutasComponent implements OnInit {

  constructor(private apiService: ApiService,private cdr: ChangeDetectorRef) { }
  isLoading = false;
  public Editor = ClassicEditor;
  public editorData: string = '';
  public editorDataContactUs: string = '';
  public editorDataFAQ: string = '';
  message: any;
  public editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
      '|',
      'print',
      'find',
      'replace',
      'highlight',
      'removeFormat', // Added 'highlight' and 'removeFormat'
      '|',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      '|',
      'styles',
      'fontFamily',
      'fontSize', // Added 'fontSize'
      'fontColor',
      'backgroundColor',
      '|',
      'maximize',
      'showBlocks'
    ],
  };
  @ViewChild('toaster') toaster!: ManualToasterComponent;
  @ViewChild('toastererror') toastererror!: ManualToasterErrorComponent;
  ngOnInit(): void {
    this.getData();
  }
  onReady(editor: any) {
    // Optional: You can handle the editor instance here.
    // For example, to listen for changes and force change detection:
    editor.model.document.on('change:data', () => {
      this.editorData = editor.getData();
      this.cdr.detectChanges(); // Force Angular change detection
    });
  }
  getData() {
    this.isLoading = true
    this.apiService.get('getGeneral').subscribe((response: any) => {
      if (response.status == 'sucess') {
        for (let i = 0; i < response.message.length; i++) {
          if (response.message[i].name == 'AboutUs') {
            this.editorData = response.message[i].content
          }
          if(response.message[i].name == 'ContactUs'){
            this.editorDataContactUs = response.message[i].content
          }
          if(response.message[i].name == 'FAQ'){
            this.editorDataFAQ = response.message[i].content
          }
        }
        this.isLoading = false
      }
    });

  }
  saveAboutus() {
    this.isLoading = true
    if (this.editorData != '') {
      const param = {
        content: this.editorData
      }
      this.apiService.post('updateAboutUs', param).subscribe((response: any) => {
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
    } else {
      this.isLoading = false
      this.showToasterError('Enter some content')
    }
  }
  clearAboutus() {
    this.editorData = ''
  }
  saveContactus() {
    this.isLoading = true
    if (this.editorDataContactUs != '') {
      const param = {
        content: this.editorDataContactUs
      }
      this.apiService.post('updateContactUs', param).subscribe((response: any) => {
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
    } else {
      this.isLoading = false
      this.showToasterError('Enter some content')
    }
  }
  clearContactus() {
    this.editorDataContactUs = ''
  }
  saveFAQ() {
    this.isLoading = true
    if (this.editorDataFAQ != '') {
      const param = {
        content: this.editorDataFAQ
      }
      this.apiService.post('updateFAQ', param).subscribe((response: any) => {
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
    } else {
      this.isLoading = false
      this.showToasterError('Enter some content')
    }
  }
  clearFAQ() {
    this.editorDataFAQ = ''
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
