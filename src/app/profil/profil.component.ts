import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, Request } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;
  userEmail = '';
  form: FormGroup;

  constructor(private profilService: ProfilService,private formBuilder: FormBuilder,private itemService: ItemService, private authService:AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      this.decodeToken();
      //console.log(this.decodedToken);
      if(this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }else{
        this.initForm();
      }
    }
  }

  decodeToken(){
    const jbbToken = JSON.parse(localStorage.getItem('jbb-token'));
    this.decodedToken = this.authService.decodeToken(jbbToken.token);
  }

  initForm(){
    let email = '';
    let firstName = '';
    let lastName = '';
    // Remplir les form value si elles existeent
    if(this.decodedToken){
      this.decodedToken.email ? email = this.decodedToken.email : '';
      this.decodedToken.firstName ? firstName = this.decodedToken.firstName : '';      
      this.decodedToken.lastName ? lastName = this.decodedToken.lastName : '';
    }

    this.form = this.formBuilder.group({
      email,
      firstName,
      lastName
    });
  }

  updateProfil(formData){
    let id = this.decodedToken.id;
    //console.log(formData);
    let data = {id,...formData}
    this.profilService.updateProfil(data).subscribe(res => {
      this.authService.updateToken(res);
      this.decodeToken();
    });
    
  }

}
