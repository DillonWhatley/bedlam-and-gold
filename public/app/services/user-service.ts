import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {User}           from './user';


@Injectable()
export class UserService {
  tempUserUrl: string;
  private headers: Headers;
  private _usersUrl = '/users/Slam';  // URL to web api  
  private tempUrl;
    
  constructor (private http: Http) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
  }
  
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
  
  requestFriend(user){
      console.log(user);
      this.tempUserUrl = '/friends/'+user;
      let body = JSON.stringify(user);
      console.log(body);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.tempUserUrl, body, options)
                        .map(res => <User[]> res.json().data)
                        .do(data => console.log(data))
                        .catch(this.handleError);
  }
  // TODO: Retrieve pending requests
  findRequests(){    
    this.tempUrl = '/friend-requests';
    console.log("user-service client side");
    return this.http.get(this.tempUrl)
                    .map(res => <User[]> res.json().data)
                     .do(data => console.log(data))
                    .catch(this.handleError);
  }
  
  
  
  // TODO: acceptFriend http PUT to url+
  acceptRequest(newFriend){
    this.tempUrl = '/users/friend-requests'
    let body = JSON.stringify(newFriend);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.tempUrl, body, options)
                      .map(res => <String> res.json().data)
                      .do(data => console.log(data))
                      .catch(this.handleError);
    
  }
  denyRequest(newFriend){
    this.tempUrl = '/friends-deny'
    let body = JSON.stringify(newFriend);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.tempUrl, body, options)
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
