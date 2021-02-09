import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register3',
  templateUrl: './register3.page.html',
  styleUrls: ['./register3.page.scss'],
})
export class Register3Page  {

  private file:File;
  private filetwo:File;
  private file3:File;

  constructor(private http: HttpClient, private router: Router) { }

  onFileChange(fileChangeEvent){
    this.file = fileChangeEvent.target.files[0];
  }
  async submitForm(){
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    this.http.post("http://localhost:3000/upload", formData ).subscribe((response) => {
    console.log(response);
    });
  }


  registerCompleted(){
  	this.router.navigate(['registercomplete'])
  }

  navigateBack(){
  	this.router.navigate(['register2'])
  }

}
