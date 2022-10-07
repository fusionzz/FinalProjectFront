import { Account } from "./Account"

export class Transaction{
    transactionId?:number
    toAccount?:Account
    fromAccount?:Account
    amount?:number
    memo?:string
}