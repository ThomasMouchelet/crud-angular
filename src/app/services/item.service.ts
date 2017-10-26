import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  constructor(private http:Http) { }

  getItems(){
    return this.http.get('data/items.json')
                    .map(res => res.json());
  }
  getItem(id){
     return this.http.get('data/items.json')
                      .map(res => res.json().filter(i => i._id == id)[0]);
  }
}
