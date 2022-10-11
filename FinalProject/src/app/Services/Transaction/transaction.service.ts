import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/Models/Transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  getTransactionByAccount(id:number){
    return this.http.get(environment.url+"Transactions/Account/" + id)
  }

  newTransaction(transaction:Transaction){
    return this.http.post(environment.url+"Transactions", transaction, this.httpOptions)
  }

}
