import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {GameService}       from './services/game-service';
import {BagNavbar}      from './components/bag-navbar';
import {AccountComponent}      from './components/my-account';
import {GameComponent}    from './components/game';
import {AvatarCreationComponent} from './components/avatar-creation';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <div>
             <bag-navbar></bag-navbar>
        </div>
        <nav id="navbar">
          <a [routerLink]="['Game']">Game</a>
          <a [routerLink]="['AvatarCreation']">Avatar Creation</a>
          <a [routerLink]="['MyAccount']">My Account</a>
        </nav>
    </div>
    <router-outlet></router-outlet>
    `,
    styles: [`
    #navbar {
        color:white;
        padding: 5px;
        align-content: center;
        align-items:center;
        display:flex;
        flex-flow: row wrap;
        justify-content:center;
      }
      a {
        font-weight: bold;
        outline:none;
        padding: 5px 15px;
        text-decoration: none;
      }
      a:link {
        color: #FF355E;
        font-weight: bold;
      }
      a:visited {
        color:rgb(60, 173, 119);
      }
      a:hover {
        color:rgb(176, 39, 39)
      }
    `],
    directives: [BagNavbar, ROUTER_DIRECTIVES],
    providers: [UserService, GameService, ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/', name: 'Game', component: GameComponent, useAsDefault: true },
    { path: '/account', name: 'MyAccount', component: AccountComponent },
    { path: '/avatars', name: 'AvatarCreation', component: AvatarCreationComponent }
])
export class AppComponent {
    public title = 'Blood and Glory';
}
