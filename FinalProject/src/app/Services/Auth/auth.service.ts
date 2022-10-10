import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService) { }

  isAuthenticated():boolean{
    let id = sessionStorage.getItem('userId')

    if (id == null){
      return false
    }

    this.userService.getUserById(id).subscribe(
      response => {
        let user = response as User
        return id == user.userId?.toString()
      },
      error => {
        return false
      }
    )

      return false

  }

}
