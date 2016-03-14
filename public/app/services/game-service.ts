import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';

@Injectable()
export class GameService {
  constructor (private http: Http) {}

  create () {
    var body = null;
    var options = null;
    return this.http.post('/game', body, options)
                    .map(res => <String> res.json().data)
                      .do(data => console.log(data))
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
