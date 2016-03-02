import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {User}           from './user';


@Injectable()
export class UserService {
  constructor (private http: Http) {}

  private _usersUrl = '/users/Bob';  // URL to web api

  getUsers () {
    return this.http.get(this._usersUrl)
                    .map(res => <User[]> res.json().data)
                      .do(data => console.log(data))
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
