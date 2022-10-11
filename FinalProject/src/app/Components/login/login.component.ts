import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  error = false

  LoginForm = this.fb.group({
    username:[""],
    password:[""]
  })

  onLogin(){
    this.userService.login(this.LoginForm.value.username!, this.LoginForm.value.password!).subscribe(
      response => {
        let user = response as User
        sessionStorage.setItem('userId', user.userId?.toString()!)
        sessionStorage.setItem('role', user.role!)
        sessionStorage.setItem('name',user.name!)
        this.router.navigate(["/accounts"])
      },
      error => {
        this.error = true
        console.log(error)
      }
    )
  }


}
