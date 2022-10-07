import { Account } from "./Account"

export class Transaction{
    TransactionId?:number
    ToAccount?:Account
    FromAccount?:Account
    Amount?:number
    Memo?:string
}