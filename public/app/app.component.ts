import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {GameService}       from './services/game-service';
import {AccountComponent}      from './components/account/my-account';
import {GameComponent}    from './components/game';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <nav>
        <div class="left">
          <button [routerLink]="['Game']">Game</button>
          <button [routerLink]="['MyAccount']">My Account</button>
        </div>
        <div class="right">
          <button id="logOutButton" (click)="logOut()">Logout</button>
        </div>
      </nav>
    </div>
    <router-outlet></router-outlet>
    `,
    styles: [`
      button {
        background-color: #0f7a76;
        border:1px solid #2d807c;
        border-radius: 3px;
        color: lightgoldenrodyellow;
        cursor: pointer;
        font-weight: bold;
        margin: 5px 10px;
        padding:5px;
        transition: border 0.3s, color 0.3s;
      }
      button:hover {
        border:1px solid rgb(114, 200, 141);
        color:white;
      }
      div {
        background-color:inherit;
      }
      #logOutButton{
          margin-right: 5px;
      }
      .left {
        display:flex;
        justify-content:flex-start;
        flex-flow:row wrap;
      }
      nav {
        align-content:center;
        align-items: center;
        background-color: #073c3a;
        background: linear-gradient(left, #073c3a, #124a48 );
        color:white;
        display:flex;
        flex-flow: row wrap;
        padding: 5px;
      }
      .right {
        display:flex;
        justify-content:flex-end;
        flex-flow:row wrap;
        flex-grow:1;
      }
    `],
    directives: [ ROUTER_DIRECTIVES],
    providers: [UserService, GameService, ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/pages/game', name: 'Game', component: GameComponent, useAsDefault: true },
    { path: '/pages/account', name: 'MyAccount', component: AccountComponent }
])
export class AppComponent {
    public title = 'Blood and Glory';
    constructor(private http: Http) { }

    logOut() {
        return this.http.post('/logout', '').map(res => res.json().data)
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
