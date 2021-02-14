import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('userNameTitle') private userNameTitle: ElementRef;
  @ViewChild('passwordTitle') private passwordTitle: ElementRef;
  @ViewChild('mobileOrEmailTitle') private mobileOrEmailTitle: ElementRef;
  @ViewChild('fullNameTitle') private fullNameTitle: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  userNameChangeTextEvent(ele ,text) {
    if (text.length > 0 && !ele.classList.contains('move-up')) {
      ele.classList.add('move-up');
    }
    if (text.length === 0 && ele.classList.contains('move-up')) {
      ele.classList.remove('move-up');
    }
  }


}
