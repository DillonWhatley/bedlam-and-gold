import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {GameService}       from './services/game-service';
import {BagNavbar}      from './components/bag-navbar';

declare var io: any;

@Component({
    selector: 'my-app',
    template: `
    <bag-navbar></bag-navbar>
    <div id="flex-container">
      <h1>Welcome to Blood &amp; Glory</h1>
      <div id="server-messages">
        <div>Game</div>
        <ul>
          <li *ngFor="#message of serverMessages">{{message}}</li>
        </ul>
      </div>
      <input id="user-input" #message (keyup.enter)="send(message.value)" autofocus>
      <button (click)="createGame()" id="create-game">New Game</button>
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
      #create-game {
        background-color:rgb(59, 77, 153);
        border:none;
        color:rgb(217, 216, 221);
        padding:5px;
        transition: background-color 0.3s;
      }
      #create-game:hover {
        background-color:rgb(143, 142, 15);
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
      li {
        background-color:black;
        color:maroon;
      }
      #send-ping {
        background-color:maroon;
        border:none;
        color:white;
      }
      #server-messages {
        background-color:black;
        color:rgb(30, 164, 84);
        height:70vh;
        width:600px;
        word-wrap:break-word;
        overflow-y:auto;
      }
      ul {
        display:block;
        list-style:none;
      }
      #user-input {
        border:none;
        border-top: 1px solid maroon;
        background-color:black;
        color:rgb(30, 164, 84);
        width:600px;
      }
      `],
    providers: [UserService, GameService],
    directives: [BagNavbar]
})
export class AppComponent implements OnInit{
  errorMessage: string;
  users:User[];
  socket: any;
  gameConnection:any;
  serverMessages: string[];

  constructor(private userService: UserService, private gameService: GameService){
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
    this.userService.getUsers()
                     .subscribe(
                       users => this.users = users,
                       error =>  this.errorMessage = <any>error);
  }
  createGame() {
    this.gameService.create().subscribe(
      (gameInstanceId:string) => this.connectToGame(gameInstanceId),
      error => this.errorMessage = <any>error
    );
  }
  connectToGame(gameInstanceId:string) {
    this.gameConnection = io('/'+gameInstanceId);
    var context = this;
    this.gameConnection.on('welcome', function(msg) {
      context.serverMessages.push(msg[0]);
    });
    this.gameConnection.on('game-world-event', function(events) {
      for( var i = 0 ;i < events.length; i++) {
        context.serverMessages.push(events[i]);
      }
    });
  }

  send(message:string) {
    this.socket.emit('message', { message: message });
  }
}
