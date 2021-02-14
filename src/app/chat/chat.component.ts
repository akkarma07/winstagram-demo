import { Component, OnInit } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  stompClient = null;
   nameValue;
  constructor() { }
   url = window.location.href;
   urlParams;
   isConected;
   stompClientUnSubscribe;
  ngOnInit() {
    this.urlParams = new HttpParams ({ fromString: this.url.split('?')[1] });

  }
  submit() {

  }
  setConnected(connected) {
    if(connected) {
      document.querySelector("#connect").setAttribute("disabled", connected );
      document.querySelector("#disconnect").removeAttribute("disabled");
    } else {
      document.querySelector("#disconnect").setAttribute("disabled", connected );
      document.querySelector("#connect").removeAttribute("disabled");
    }
      if (connected) {
        (document.querySelector("#conversation") as HTMLElement).style.display = "block";
      }
      else {
        (document.querySelector("#conversation") as HTMLElement).style.display = "none";
      }
      (document.querySelector("#conversation") as HTMLElement).innerHTML = '';
  }

   connect(connect = false) {
      const socket = new SockJS('http://localhost:8091/ws');
      this.stompClient = Stomp.Stomp.over(socket);
      this.stompClient.connect({}, (frame) =>  {
        if (!connect) {
          this.setConnected(true);
        }
          this.isConected =  true;
          console.log('Connected: ' + frame);
          if ( this.stompClientUnSubscribe) {
            this.stompClientUnSubscribe.unsubscribe();
          }
          this.stompClientUnSubscribe = undefined;
      this.stompClientUnSubscribe =   this.stompClient.subscribe('/topic/user/' + this.urlParams.get("userId"), (message) => {
              this.showMassage(JSON.parse(message.body).content);
          });
          socket.onclose = () => {
            this.stompClient.disconnect();
            this.isConected = false;
            console.log('close');
            this.showMassage('connection close');
            if ( this.stompClientUnSubscribe) {
              this.stompClientUnSubscribe.unsubscribe();
            }
            this.stompClientUnSubscribe = undefined;
    const interval = setInterval(() => {
      this.showMassage('try to reconnection ...');
              this.connect(true);
            if(this.isConected) {
              this.showMassage('Connected!! Enjoy....')
              console.log('reconnected');
              clearInterval(interval);
      }
    } , 10000);
        };
      });
  }
  
   disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
      this.setConnected(false);
      console.log("Disconnected");
  }
  inputNameValue(nameValue) {
    this.nameValue = nameValue;
  }
   sendName() {
    this.stompClient.send("/app/user/" + this.urlParams.get("userId"), {}, JSON.stringify({'name': this.nameValue}));
  }

   showMassage(message) {
      document.getElementById('conversation').innerHTML =
       document.getElementById('conversation').innerHTML + ("<tr><td>" + message + "</td></tr>");
  }

}
