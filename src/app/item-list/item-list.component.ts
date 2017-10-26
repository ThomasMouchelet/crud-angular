import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items = [];

  constructor(private http:Http, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(
      data => this.items = data,
      error => console.error(error)
    )
  }

}
