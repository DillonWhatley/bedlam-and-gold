import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Character}      from './character';


@Injectable()
export class CharacterService {
  constructor (private http: Http) {}

  private _characters = '/characters';  // URL to web api

  findCharacters () {
    return this.http.get(this._characters)
                    .map(res => <Character[]> res.json().data)
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
