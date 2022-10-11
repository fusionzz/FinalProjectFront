import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { Transaction } from 'src/app/Models/Transaction';
import { AccountService } from 'src/app/Services/Account/account.service';
import { TransactionService } from 'src/app/Services/Transaction/transaction.service';
import { Account } from 'src/app/Models/Account';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {
  @ViewChild("closeButton") closeButton:any

  constructor(private transactionService:TransactionService, private accountService:AccountService, private location:Location, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.currentAccount = this.accountService.currentAccount;
    if (this.currentAccount == null) {
      this.location.back()
    }
    this.getTransactions(this.currentAccount?.accountId!)
  }

  currentAccount?:Account;
  transactions?:Transaction[];
  inSystem = true

  NewTransactionForm = this.fb.group({
    toAccount:[0],
    fromAccount:[this.currentAccount?.accountId],
    amount:[0],
    memo:[""]
  })

  switchDisableToAccount(inSystem:boolean){
    if (!inSystem){
      this.NewTransactionForm.get('toAccount')?.disable()
      this.NewTransactionForm.patchValue({
        toAccount:0
      })
    }
    else{
      this.NewTransactionForm.get('toAccount')?.enable()
    }
  }

  getTransactions(accountId:number){
    this.transactionService.getTransactionByAccount(this.currentAccount?.accountId!).subscribe(
      response => {
        this.transactions = response as Transaction[]
      }, error => {
        console.log(error)
      }
    )
  }

  onCreateSave(){
    let transaction:Transaction = {
      toAccount:{
        accountId:this.NewTransactionForm.value.toAccount!,
        customer:{
          userId:0,
          username:"string",
          password:"string",
          role:"string",
          name:"string",
          dob:new Date,
          address:"string",
          city:"string",
          state:"string",
          pin:"string",
          phone:"string",
          email:"string",
        },
        accountType:"string",
        createdAt:new Date,
        currAmount:0,
        status:"string",
      },
      fromAccount:{
        accountId:this.currentAccount?.accountId,
        customer:{
          userId:0,
          username:"string",
          password:"string",
          role:"string",
          name:"string",
          dob:new Date,
          address:"string",
          city:"string",
          state:"string",
          pin:"string",
          phone:"string",
          email:"string",
        },
        accountType:"string",
        createdAt:new Date,
        currAmount:0,
        status:"string",
      },
      amount:this.NewTransactionForm.value.amount!,
      memo:this.NewTransactionForm.value.memo!
    }

    this.transactionService.newTransaction(transaction).subscribe(
      response => {
        this.getTransactions(this.currentAccount?.accountId!);
        this.closeButton.nativeElement.click()
      }, error => {
        console.log(error)
      }
    )

  }


}
