import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class ProfilService {

  BASE_URL = 'http://localhost:4201/profil/';

  constructor(private http:Http, private authService: AuthService) { }

  updateProfil(userData){
    return this.http.post(this.BASE_URL + '/update-profil', userData)
                .map(res => res.json() );
  }
}
