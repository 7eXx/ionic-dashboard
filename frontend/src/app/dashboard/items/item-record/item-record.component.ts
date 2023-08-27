import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item, ItemsService} from "../../../services/items.service";

@Component({
  selector: 'app-item-record',
  templateUrl: './item-record.component.html',
  styleUrls: ['./item-record.component.scss'],
})
export class ItemRecordComponent  implements OnInit {

  @Input() item!: Item;

  @Output() deleteEmitter = new EventEmitter();
  @Output() publishEmitter = new EventEmitter<boolean>();

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {}

  public onDelete() {
    this.deleteEmitter.emit();
  }

  public onTogglePublish() {
    this.publishEmitter.emit(!this.item.published);
  }
}
