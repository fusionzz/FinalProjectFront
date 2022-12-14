import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCrudComponent } from './Components/account-crud/account-crud.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserCrudComponent } from './Components/user-crud/user-crud.component';
import { ViewAccountComponent } from './Components/view-account/view-account.component';
import { AuthService } from './Services/Auth/auth.service';

const routes: Routes = [{
  path: 'accounts',
  component: AccountCrudComponent,
  canActivate: [AuthService]
}, {
  path: 'users',
  component: UserCrudComponent,
  canActivate: [AuthService]
}, {
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'viewaccount',
  component: ViewAccountComponent,
  canActivate: [AuthService]
}, {
  path: 'register',
  component: RegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
