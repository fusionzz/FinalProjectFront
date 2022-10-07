import { User } from "./User"

export class Account{
    accountId?:number
    customer?:User
    accountType?:string
    createdAt?:Date
    currAmount?:number
    status?:string
}