import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Add/operator/map';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items = [];

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('data/items.json')
              .map(res => this.items = res.json())
              .subscribe();
  }

}
