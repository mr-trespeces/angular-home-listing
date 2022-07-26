import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedin = false

  constructor(private router: Router) { }

  logout() {
    localStorage.clear()
  }


  ngOnInit() {
  }

  ngDoCheck() {
    this.isLoggedin = localStorage.getItem('session') != undefined? true : false
  }

}
