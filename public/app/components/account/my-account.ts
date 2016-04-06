import {Component} from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
    selector: 'my-account',
    templateUrl: '/app/components/account/account.html'
})
export class AccountComponent {
    constructor(private _router: Router) { }
}
