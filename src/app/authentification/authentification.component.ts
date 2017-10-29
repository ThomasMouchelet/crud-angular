import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  isAuthenticated = false;
  jbbToken = null;
  JBB_TOKEN_NAME = 'jbb-token';

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.refreshFlags();
  }  

  refreshFlags() {
    if(this.authService.userIsLoggedIn()) {
      this.isAuthenticated = true;
      const jbbToken = JSON.parse(localStorage.getItem(this.JBB_TOKEN_NAME));
      this.router.navigate(['/profil']);
    }
  }

  login(credentials) {
    this.authService.login(credentials)
                    .subscribe(
                      data => {
                        this.handleLoginSuccess(data)
                      },
                      error => {
                        this.handleLoginFailure(error)
                      }
                    )
  }

  handleLoginSuccess(data) {
    console.log('success: ', data);
    this.jbbToken = data;
    localStorage.setItem(this.JBB_TOKEN_NAME, JSON.stringify(data));
    this.router.navigate(['/profil']);
  }

  handleLoginFailure(error) {
    console.error('failure: ', error);
  }

}
