import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {User}           from './user';


@Injectable()
export class UserService {
  tempUserUrl: string;  
    
  constructor (private http: Http) {}

  private _usersUrl = '/users/Bob';  // URL to web api

  getUsers () {
    return this.http.get(this._usersUrl)
                    .map(res => <User[]> res.json().data)
                      .do(data => console.log(data))
                    .catch(this.handleError);
  }
  
  findUser(user:string) {
      this.tempUserUrl = '/users/'+user;
      return this.http.get(this.tempUserUrl)
                      .map(res => <User[]> res.json().data)
                        .do(data => console.log(data))
                      .catch(this.handleError);
  }
  
  requestFriend(user:string){
      this.tempUserUrl = '/users/'+user;
      return this.http.post(this.tempUserUrl)
  }
  
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
