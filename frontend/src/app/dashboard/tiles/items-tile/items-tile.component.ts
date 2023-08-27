import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Item, ItemsService} from "../../../services/items.service";

@Component({
  selector: 'app-items-tile',
  templateUrl: './items-tile.component.html',
  styleUrls: ['./items-tile.component.scss'],
})
export class ItemsTileComponent  implements OnInit {

  title = 'Items';

  items: Item[] = [];
  publishedItems: Item[] = [];
  notPublishedItems: Item[] = [];

  itemsSubscription!: Subscription;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.subscribeItems();
  }

  private subscribeItems() {
    this.unsubscribeItems();
    this.itemsSubscription = this.itemsService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.publishedItems = items.filter((item) => item.published);
        this.notPublishedItems = items.filter((item) => !item.published);
      },
      error: (err) => console.error(err)
    })
  }

  private unsubscribeItems() {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
