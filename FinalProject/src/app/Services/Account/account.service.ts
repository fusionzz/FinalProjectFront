import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/Models/Account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  currentAccount?:Account;

  getAccounts(){
    return this.http.get(environment.url+"Accounts")
  }

  getAccountsById(id:number){
    return this.http.get(environment.url+"Accounts/User/"+id)
  }

  editAccountSubmit(account:Account){
    return this.http.put(environment.url+"Accounts/"+account.accountId, account, this.httpOptions)
  }

  deleteAccount(id:number){
    return this.http.delete(environment.url+"Accounts/"+id)
  }

  addAccount(account:Account){
    return this.http.post(environment.url+"Accounts", account, this.httpOptions)
  }



}
