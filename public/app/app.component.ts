import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {BagNavbar}      from './components/bag-navbar';

@Component({
    selector: 'my-app',
    template: `
    <bag-navbar></bag-navbar>
    <h1>Welcome to Blood &amp; Glory</h1>
      <ul>
        <li *ngFor="#user of users">
          {{ user.name }}
        </li>
      </ul>
    `,
    styles: [`
      `],
    providers: [UserService],
    directives: [BagNavbar]
})
export class AppComponent implements OnInit{
  constructor(private _userService: UserService){}

  errorMessage: string;
  users:User[];

  ngOnInit() { this.getUsers(); }
  getUsers() {
    this._userService.getUsers()
                     .subscribe(
                       users => this.users = users,
                       error =>  this.errorMessage = <any>error);
  }
}
