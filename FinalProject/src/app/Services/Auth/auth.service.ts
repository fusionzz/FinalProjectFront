import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from '../User/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService) { }

  canActivate():Observable<boolean>{
    let id = sessionStorage.getItem('userId')
    let role = sessionStorage.getItem('role')

    if (id == null || role == null){
      return of(false)
    }

    this.userService.getUserById(id).subscribe(
      response => {
        let user = response as User
        return role == user.role
      },
      error => {
        return false
      }
    )

      return of(true)

  }

}
