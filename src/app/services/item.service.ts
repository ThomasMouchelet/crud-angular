import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  BASE_URL = 'http://localhost:4201';

  constructor(private http:Http) { }

  getItems(){
    return this.http.get(this.BASE_URL + '/api/items')
                    .map(res => res.json());
  }
  getItem(id){
    return this.http.get(this.BASE_URL + `/api/items/${id}`)
                      .map(res => res.json());
  }
}
