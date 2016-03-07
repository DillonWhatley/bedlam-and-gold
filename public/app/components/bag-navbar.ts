import {Component} from 'angular2/core';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
    selector: 'bag-navbar',
    template: `
    <div>
    <button (click)="logOut()">Logout</button>
    </div>
    `,
    styles: [`
      div {
        background-color: maroon;
        color:white;
        padding: 5px;
      }
      button {
        border-radius: 3px;
        color:white;
        cursor: pointer;
        font-weight: bold;
        padding:5px;
      }
      `]
})
export class BagNavbar{
  constructor (private http: Http) {}

  logOut() {
    return this.http.post('/logout','').map(res => res.json().data)
                    .subscribe(data => this.handleResponse(data),
                               error => this.handleError(error));
  }

  handleResponse(data) {
    window.location.href = "/login";
  }

  handleError(error) {
    console.log(error);
  }

}
