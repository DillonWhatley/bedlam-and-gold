import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {InventoryItem} from '../model/inventory-item';

@Injectable()
export class InventoryService {
  constructor (private http: Http) {}

  findByUser (username) {
    return this.http.get('/users/'+username+'/inventoryItems')
                    .map(res => <InventoryItem[]> res.json().data)
                      .do(data => console.log(data))
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
