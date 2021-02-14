import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  public result:any
  constructor(private userProfileService: UserProfileService) {

  }

  ngOnInit() {

    this.userProfileService.getUsers().subscribe(
      res => {
        this.result =  res;

      }
    )

  }



}
