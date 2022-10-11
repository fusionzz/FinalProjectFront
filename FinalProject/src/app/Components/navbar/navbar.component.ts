import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.getAuth()
          this.getManager()
        }

        if (event instanceof NavigationEnd) {
          this.getAuth()
          this.getManager()
        }
      }
    )
   }




  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([""])
  }

  isAuth = false
  isManager = false

  getAuth(){
    this.isAuth = sessionStorage.getItem("userId") != null
  }

  getManager(){
    this.isManager = sessionStorage.getItem('role')?.toLowerCase() == "manager"
  }

}
