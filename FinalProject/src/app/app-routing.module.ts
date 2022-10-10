import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCrudComponent } from './Components/account-crud/account-crud.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { UserCrudComponent } from './Components/user-crud/user-crud.component';

const routes: Routes = [{
  path: 'accounts',
  component: AccountCrudComponent
}, {
  path: 'users',
  component: UserCrudComponent
}, {
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
