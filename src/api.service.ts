import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local API
   private apiUrl = 'http://localhost:3000/api/web';
   //public ImgapiUrl = 'http://localhost:3000/api/djuser/image/';

  //Server API
  // private apiUrl = 'https://redlinersevent.com/api/web';
   public ImgapiUrl = 'https://redlinersevent.com/api/djuser/image/';

  constructor(private http: HttpClient) { }

  // Define your API methods here
  get(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // Add more methods as needed (e.g., put(), delete(), etc.)


  // for component

  // getData() {
  //   this.apiService.get('data').subscribe(response => {
  //     // Handle the response here
  //   });
  // }

  // postData() {
  //   const data = { name: 'John', age: 30 };
  //   this.apiService.post('data', data).subscribe(response => {
  //     // Handle the response here
  //   });
  // }
}
