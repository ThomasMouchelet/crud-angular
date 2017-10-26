import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  items = [];

  constructor(private http:Http) { }

  getItems(){
    return this.http.get('data/items.json')
                    .map(res => res.json());
  }
}
