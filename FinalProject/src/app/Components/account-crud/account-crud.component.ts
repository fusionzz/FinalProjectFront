import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/Models/Account';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-account-crud',
  templateUrl: './account-crud.component.html',
  styleUrls: ['./account-crud.component.css']
})
export class AccountCrudComponent implements OnInit {
  @ViewChild("closeButton") closeButton:any
  @ViewChild("closeButton2") closeButton2:any



  constructor(private accountService:AccountService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("role")?.toLowerCase() == "manager"){
      this.isManager = true
    }
    else{
      this.isManager = false
    }
    
    if (this.isManager){
      this.getAllAccounts()
    }else{
      let id:number = +sessionStorage.getItem('userId')!
      this.getAccountsById(id)
    }

    if (!this.isManager){
      this.NewAccountForm.get('customerName')?.disable()
      let name = sessionStorage.getItem('name')
      this.NewAccountForm.patchValue({
        customerName:name
      })

    }

  }

  isManager = false

  accounts?:Account[];

  currAccount?:Account;

  success = false;

  searchText = ""

  EditAccountForm = this.fb.group({

    accountType: [""],
    currAmount: [0],
    status: [""]

  })

  NewAccountForm = this.fb.group({
    customerName: [""],
    accountType: [""],
    currAmount: [0],
    status: [""]
  })


  getAllAccounts(){
    this.accountService.getAccounts().subscribe(
      response => {
        this.accounts = response as Account[]
      }
    )
  }

  getAccountsById(id:number){
    this.accountService.getAccountsById(id).subscribe(
      response => {
        this.accounts = response as Account[]
      }
    )
  }

  editAccount(account:Account){
    this.currAccount = account;
    if (this.currAccount){
    this.EditAccountForm.patchValue({
      accountType : this.currAccount.accountType,
      currAmount : this.currAccount.currAmount,
      status : this.currAccount.status
    })
  }
  }


  onCreateSave(){
    
    let name = "";
    if (this.isManager){
      name = this.NewAccountForm.value.customerName!
    }else{
      name= sessionStorage.getItem('name')!
    }

    this.currAccount = {
      customer : {
        username:"string",
        password:"string",
        role:"string",
        name : name,
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
        if (this.isManager){
          this.getAllAccounts();
        }
        else{
          let id:number = +sessionStorage.getItem('userId')!
          this.getAccountsById(id)
        }
        this.closeButton2.nativeElement.click()
        this.NewAccountForm.reset()
      },
      error => {
        console.log(error)
      }
    )
  }

  onEditSave(){
    if (this.currAccount){
      this.currAccount.accountType = this.EditAccountForm.value.accountType!
      this.currAccount.currAmount = this.EditAccountForm.value.currAmount!
      this.currAccount.status = this.EditAccountForm.value.status!
    }

    this.accountService.editAccountSubmit(this.currAccount!).subscribe(
      response => {
        console.log(response)
        this.closeButton.nativeElement.click()
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteAccount(account:Account){
    this.accountService.deleteAccount(account.accountId!).subscribe(
      response => {
        this.getAllAccounts();
      }
    )
  }

  viewTransaction(account:Account){
    this.accountService.currentAccount = account
    this.router.navigate(["viewaccount"])
  }

}
