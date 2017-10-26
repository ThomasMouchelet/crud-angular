import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item = null;

  constructor(private activatedRoute:ActivatedRoute, private itemService:ItemService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.itemService.getItem(id).subscribe(
      res => this.item = res
    );
  }

}
