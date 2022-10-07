import { User } from "./User"

export class Account{
    AccountId?:number
    Customer?:User
    AccountType?:string
    CreatedAt?:Date
    CurrAmount?:number
    Status?:string
}