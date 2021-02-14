import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClient:HttpClient) { }
  
  
  getUser() {

    return 'nilesh Gupta'
  }

  getUsers() {

   return this.httpClient.get('https://reqres.in/api/users?page=2', {})
  
  }





}
