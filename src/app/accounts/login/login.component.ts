import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'winsta-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userNameTitle') private userNameTitle: ElementRef;
  @ViewChild('passwordTitle') private passwordTitle: ElementRef;

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
