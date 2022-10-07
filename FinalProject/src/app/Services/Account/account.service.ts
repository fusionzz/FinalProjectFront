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

  getAccounts(){
    return this.http.get(environment.url+"Accounts")
  }

  editAccountSubmit(account:Account){
    return this.http.put(environment.url+"Accounts/"+account.accountId, account, this.httpOptions)
  }

  deleteAccount(id:number){
    return this.http.delete(environment.url+"Accounts/"+id)
  }



}
