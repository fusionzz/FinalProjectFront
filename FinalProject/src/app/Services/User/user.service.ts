import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  getUsers(){
    return this.http.get(environment.url+"Users")
  }

  getUserById(id:string){
    return this.http.get(environment.url+"Users/"+id)
  }

  editUserSubmit(user:User){
    return this.http.put(environment.url+"Users/"+user.userId, user, this.httpOptions)
  }

  deleteUser(id:number){
    return this.http.delete(environment.url+"Users/"+id)
  }

  addUser(user:User){
    return this.http.post(environment.url+"Users", user, this.httpOptions)
  }

  login(username:string, password:string){
    return this.http.post(environment.url+"Users/login/"+username, '"'+password+'"', this.httpOptions)
  }
}
