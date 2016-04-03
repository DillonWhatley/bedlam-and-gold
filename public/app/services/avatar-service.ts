import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Avatar}      from '../model/avatar';


@Injectable()
export class AvatarService {
  constructor (private http: Http) {}

  private _avatars = '/avatars';  // URL to web api

  findAvatars () {
    return this.http.get(this._avatars)
                    .map(res => <Avatar[]> res.json().data)
                      .do(data => console.log(data))
                    .catch(this.handleError);
  }

  createAvatar (avatar: Avatar) {
    let stringifiedAvatar = JSON.stringify(avatar);
    return this.http.post(this._avatars, stringifiedAvatar)
      .map(res => <String> res.json().data)
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
