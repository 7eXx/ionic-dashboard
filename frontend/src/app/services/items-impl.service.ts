import {Injectable} from "@angular/core";
import {Item, ItemsService} from "./items.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ItemsImplService extends ItemsService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public override getItems(): Observable<Array<Item>> {
    return this.httpClient.get<Array<Item>>(
      environment.url + '/items',
      {
        withCredentials: true
      }
    );
  }

  public override deleteItem(itemId: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.url + '/items',
      {
        body: {id: itemId},
        withCredentials: true
      }
    )
  }

  public override setPublishStatus(item: Item, newPublishStatus: boolean) {
    return this.httpClient.put<Item>(
      environment.url + '/items/publish', {
        id: item._id,
        published: newPublishStatus
      },
      {
        withCredentials: true
      }
    );
  }

}
