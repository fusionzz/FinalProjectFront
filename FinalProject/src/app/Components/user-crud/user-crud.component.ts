import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/User/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  @ViewChild("closeButton") closeButton:any
  @ViewChild("closeButton2") closeButton2:any
  @ViewChild("editDate") editDate:any



  constructor(private userService:UserService, private fb:FormBuilder, private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users?:User[];

  currUser?:User;
  currDOB?:any;


  roles = [ "Customer", "Manager"]

  success = false;

  searchText = ""

  EditUserForm = this.fb.group({

    username: [""],
    role: [""],
    name: [""],
    dob: [new Date()],
    address: [""],
    city: [""],
    state: [""],
    pin: [""],
    phone: [""],
    email: [""]
  })

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
  


  getAllUsers(){
    this.userService.getUsers().subscribe(
      response => {
        this.users = response as User[]
      }
    )
  }

  editUser(user:User){

    this.currUser = user;
    this.currUser.dob = new Date(this.currUser.dob!)
    this.currDOB = this.datePipe.transform(this.currUser.dob, "yyyy-MM-dd")
    if (this.currUser){
      this.EditUserForm.patchValue({
      username: this.currUser.username,
      role: this.currUser.role,
      name: this.currUser.name,
      dob: this.currUser.dob,
      address: this.currUser.address,
      city: this.currUser.city,
      state: this.currUser.state,
      pin: this.currUser.pin,
      phone: this.currUser.phone,
      email: this.currUser.email
      })
    }
  }


  onCreateSave(){
    /* this.currAccount = {
      customer : {
        username:"string",
        password:"string",
        role:"string",
        name : this.NewAccountForm.value.customerName!,
        dob: new Date,
        address:"string",
        city:"string",
        state:"string",
        pin:"string",
        phone:"string",
        email:"string"
      },
      accountType : this.NewAccountForm.value.accountType!,
      currAmount : this.NewAccountForm.value.currAmount!,
      status : this.NewAccountForm.value.status!
    }

    this.accountService.addAccount(this.currAccount).subscribe(
      response => {
        console.log(response)
        this.getAllAccounts()
        this.closeButton2.nativeElement.click()
      },
      error => {
        console.log(error)
      }
    ) */
    

    let user:User = {
      username:this.NewUserForm.value.username!,
      password:this.NewUserForm.value.password!,
      role:this.NewUserForm.value.role!,
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
        this.getAllUsers()
        console.log(response)
        this.closeButton2.nativeElement.click()
        this.NewUserForm.reset()
      },
      error => {
        console.log(error)
      }
    )
    } 
  

  onEditSave(){
    if (this.currUser){
    this.currUser = {
      userId:this.currUser.userId,
      username:this.EditUserForm.value.username!,
      password:this.currUser.password,
      role:this.EditUserForm.value.role!,
      name : this.EditUserForm.value.name!,
      dob: this.EditUserForm.value.dob!,
      address:this.EditUserForm.value.address!,
      city:this.EditUserForm.value.city!,
      state:this.EditUserForm.value.state!,
      pin:this.EditUserForm.value.pin!,
      phone:this.EditUserForm.value.phone!,
      email:this.EditUserForm.value.email!
    }
    this.userService.editUserSubmit(this.currUser).subscribe(
      response => {
        console.log(response)
        this.closeButton.nativeElement.click()
        
      },
      error => {
        console.log(error)
      }
    )
  }
  }

  deleteUser(){
    /* this.accountService.deleteAccount(account.accountId!).subscribe(
      response => {
        this.getAllAccounts();
      }
    ) */
  }

}
