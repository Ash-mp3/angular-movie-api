import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,MatButtonModule,MatTooltipModule,RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItemClass = 'menuButton'
  isHome: boolean = false
  constructor(private router: Router
  ) { }
  checkRoute() {
    if (this.router.url ==='/watchlist') {
      this.isHome = true
  }else{
    this.isHome = false
  }
}
  
}
