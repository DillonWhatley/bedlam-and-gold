import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {BagNavbar}      from './components/bag-navbar';

declare var io: any;

@Component({
    selector: 'my-app',
    template: `
    <bag-navbar></bag-navbar>
    <div id="flex-container">
      <h1>Welcome to Blood &amp; Glory</h1>
      <input type="text" #box (keyup.enter)="message=box.value">
      <div id="user-text">
        <p>{{message}}</p>
      </div>
      <div id="server-messages">
        <div>Server said:</div>
         <ul><li *ngFor="#message of serverMessages">{{message}}</li></ul>
      </div>
      <button (click)="pingServer()" id="send-ping">Ping</button>
      <div>
        <ul>
          <li *ngFor="#user of users">
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
    `,
    styles: [`

      * {
        color:white;
      }
      #flex-container {
        align-content: center;
        align-items:center;
        display:flex;
        flex-flow: column wrap;
        justify-content:center;
      }
      h1 {
        color:white;
      }
      #send-ping {
        background-color:maroon;
        border:none;
        color:white;
      }
      ul {
        color:white;
        display:block;
        list-style:none;

      }
      `],
    providers: [UserService],
    directives: [BagNavbar]
})
export class AppComponent implements OnInit{
  errorMessage: string;
  users:User[];
  socket: any;
  message: string;
  serverMessages: string[];

  constructor(private _userService: UserService){
    this.socket = io();
    this.serverMessages = [];
  }

  ngOnInit() {
    this.getUsers();
    var context = this;
    this.socket.on('server-messages', function(msg){
      context.serverMessages.push(msg[0]);
    });
  }
  getUsers() {
    this._userService.getUsers()
                     .subscribe(
                       users => this.users = users,
                       error =>  this.errorMessage = <any>error);
  }
  pingServer() {
    this.socket.emit('message', { message: this.message });
  }
}
