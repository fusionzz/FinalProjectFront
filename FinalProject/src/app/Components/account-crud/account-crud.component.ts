import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/Account/account.service';

@Component({
  selector: 'app-account-crud',
  templateUrl: './account-crud.component.html',
  styleUrls: ['./account-crud.component.css']
})
export class AccountCrudComponent implements OnInit {

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  accounts:any;

  getAllAccounts(){
    this.accountService.getAccounts().subscribe(
      response => {
        this.accounts = response
      }
    )
  }

}
