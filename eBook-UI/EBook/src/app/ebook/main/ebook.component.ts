import { Component, OnInit } from '@angular/core';

import { EBookService } from 'app/ebook/main/ebook.service';
import { EBook } from 'app/ebook/main/ebook.model'

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
  
})
export class EBookComponent implements OnInit {

  constructor() { }

  private eBooks:Array<EBook>;

  ngOnInit() {
  }

  changeState(state:string) {
      
  }

}
