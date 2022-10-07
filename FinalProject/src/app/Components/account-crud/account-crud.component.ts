import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Account } from 'src/app/Models/Account';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-account-crud',
  templateUrl: './account-crud.component.html',
  styleUrls: ['./account-crud.component.css']
})
export class AccountCrudComponent implements OnInit {
  @ViewChild("closeButton") closeButton:any



  constructor(private accountService:AccountService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  accounts?:Account[];

  currAccount?:Account;

  success = false;

  EditAccountForm = this.fb.group({

    accountType: [""],
    currAmount: [0],
    status: [""]

  })

  NewAccountForm = this.fb.group({
    customerName: [""],
    accountType: [""],
    status: [""]
  })


  getAllAccounts(){
    this.accountService.getAccounts().subscribe(
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
  
  onSave(){
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

}
