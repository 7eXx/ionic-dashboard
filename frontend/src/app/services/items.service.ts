import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ItemModel} from "../dashboard/datastructure.model";

export interface Item {
  _id: string
  title: string
  content: string;
  link: string;
  creationDatetime: string;
  published: boolean;
}

@Injectable()
export abstract class ItemsService {

  abstract getItems(): Observable<Array<Item>>;

  abstract deleteItem(itemId: string): Observable<any>;

  abstract createNewItem(item: ItemModel): Observable<Item>;

  abstract setPublishStatus(item: Item, newPublishStatus: boolean): Observable<Item>;
}
