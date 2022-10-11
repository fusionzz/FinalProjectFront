import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private location:Location) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.getAuth()
          this.getManager()
          this.name = sessionStorage.getItem('name')!
        }

        if (event instanceof NavigationEnd) {
          this.getAuth()
          this.getManager()
          this.name = sessionStorage.getItem('name')!
        }
      }
    )
   }




  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear()
    if (this.router.url != "/"){
    this.router.navigate([""])
    }else{
      window.location.reload()
    }
  }

  isAuth = false
  isManager = false
  name = ""

  getAuth(){
    this.isAuth = sessionStorage.getItem("userId") != null
  }

  getManager(){
    this.isManager = sessionStorage.getItem('role')?.toLowerCase() == "manager"
  }

}
