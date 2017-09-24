import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  uploader = new FileUploader({url: `http://localhost:30339/api/`});

  constructor() { }

  ngOnInit() {
  }

}
