import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

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

  abstract setPublishStatus(item: Item, newPublishStatus: boolean): Observable<Item>;
}
