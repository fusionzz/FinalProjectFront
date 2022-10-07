import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCrudComponent } from './Components/account-crud/account-crud.component';
import { UserCrudComponent } from './Components/user-crud/user-crud.component';

const routes: Routes = [{
  path: 'accounts',
  component: AccountCrudComponent
}, {
  path: 'users',
  component: UserCrudComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
