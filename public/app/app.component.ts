import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Response} from 'angular2/http';
import {User}              from './services/user';
import {UserService}       from './services/user-service';
import {GameService}       from './services/game-service';
import {BagNavbar}      from './components/bag-navbar';
import {AccountComponent}      from './components/my-account';
import {GameComponent}    from './components/game';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <div>
             <bag-navbar></bag-navbar>
        </div>
        <div id="navbar">
            <nav>  
            <a [routerLink]="['Game']">Game</a>
            <a [routerLink]="['MyAccount']">My Account</a>
            </nav>
        </div>
    </div>
    <router-outlet></router-outlet>     
    `,
    styles: [`
    #navbar {
        color:white;
        padding: 5px;
        width:150px;
      }
      
      a:link {
        color: #FF355E;
        font-weight: bold;
      }
    `],
    directives: [BagNavbar, ROUTER_DIRECTIVES],
    providers: [UserService, GameService, ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/game', name: 'Game', component: GameComponent, useAsDefault: true },
    { path: '/account', name: 'MyAccount', component: AccountComponent }
])
export class AppComponent {
    public title = 'Blood and Glory';
}
