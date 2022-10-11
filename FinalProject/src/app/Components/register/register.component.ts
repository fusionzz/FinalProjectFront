import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }


  NewUserForm = this.fb.group({
    userId: [0],
    username: [""],
    password: [""],
    role: ["Customer"],
    name: [""],
    dob: [new Date()],
    address: [""],
    city: [""],
    state: [""],
    pin: [""],
    phone: [""],
    email: [""]
  })

  onCreateSave(){
    let user:User = {
      username:this.NewUserForm.value.username!,
      password:this.NewUserForm.value.password!,
      role:"Customer",
      name:this.NewUserForm.value.name!,
      dob:this.NewUserForm.value.dob!,
      address:this.NewUserForm.value.address!,
      city:this.NewUserForm.value.city!,
      state:this.NewUserForm.value.state!,
      pin:this.NewUserForm.value.pin!,
      phone:this.NewUserForm.value.phone!,
      email:this.NewUserForm.value.email!,
    }
    this.userService.addUser(user).subscribe(
      response => {
        let newUser = response as User
        sessionStorage.setItem('userId', newUser.userId?.toString()!)
        sessionStorage.setItem('role', newUser.role!)
        sessionStorage.setItem('name',newUser.name!)
        this.router.navigate(["/accounts"])
      },
      error => {
        console.log(error)
      }
    )
  }

}
