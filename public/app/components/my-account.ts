import {Component} from 'angular2/core';
import { Router }  from 'angular2/router'
import {User}      from '../services/user';
import {UserService}  from '../services/user-service';;

@Component({
    selector: 'my-account',
    template: `
        <h2> Account Settings</h2><br>
        <div id="flex-container">        
            <div id="friend-search">
                <h3>Friends - </h3><br>
                Search Users: <input id="user-input" #query type="text">
                <button (click)="findUser(query.value)" id="find-user">Search</button>               
                    <div>
                        <ul>
                        <li *ngFor="#user of users">
                        <!-- TODO: Only display add friend if request not sent/not already friends (check some property thats bound during name search)-->
                            {{ user.username }} <button (click)="addFriend(user.username)" id="add-user">Add Friend!</button>
                        </li>
                        </ul>
                    </div>
            </div>
            <div id="pending-requests">
            <h3>Pending Friend Requests - </h3>
                <div *ngIf="requests">
                        <ul>
                        <li *ngFor="#request of requests.friendRequests">
                        <!-- TODO: Only display add friend if request not sent/not already friends (check some property thats bound during name search)-->
                           {{ request }} <button (click)="acceptRequest(request)" id="accept-request">Accept Friend!</button> <button (click)="denyRequest(request)" id="deny-request">Deny Request</button>
                        </li>
                        </ul>
                    </div>
                </div>
             <!-- TODO: Add pending friend requests section-->
        </div>
    `,
    styles: [`   
        * {
            font-family: 'Droid Sans', sans-serif;
            background-color: #021f24;  
            margin:0;
            padding:0;
            }
            
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
            
        #flex-container {
            color:antiquewhite;
            align-content: center;
            align-items:left;
            padding-left:15px;
            display:flex;
            flex-flow: column wrap;
            justify-content:center;
            }
            
        #friend-search {
            align-content: left;
        }   
        #pending-requests {
            margin-top: 20px;
        }
         
        h2 {
            color: antiquewhite;
            text-align: center;
            }
        h3{
            color: antiquewhite;
             text-align: left;
        }
        ul{
            padding-left:15px;
        }
            
        #user-input {
            border:none;
            border-top: 1px solid maroon;
            background-color:black;
            color:rgb(30, 164, 84);
            width:150px;
            heigh:25px;
        }
    `]
})
export class AccountComponent {
    errorMessage: string;
    userFound: boolean;
    users: User[];
    requests: User[];

    constructor(private userService: UserService, private _router: Router) {
        this.userFound = false;
        this.findRequests();
    }

    findUser(tempUser: string) {
        this.userService.findUser(tempUser).subscribe(
            users => this.users = users,
            error => this.errorMessage = <any>error);
    }
    addFriend(tempFriend: string){
        console.log("Button Press worked");
        var Friend = {'username': tempFriend};
        this.userService.requestFriend(Friend).subscribe(
                       users => this.users = users,
                       error =>  this.errorMessage = <any>error);
    }
    findRequests(){
        console.log("sup homies searching for requests");
        this.userService.findRequests().subscribe(
                       requests => this.requests = requests,
                       error =>  this.errorMessage = <any>error);
        
    }
        
    acceptRequest(tempFriend: string){
        var Friend = {'username': tempFriend};
        this.userService.acceptRequest(Friend).subscribe(
                       error =>  this.errorMessage = <any>error);
        this.findRequests();               
    }
    
    denyRequest(tempFriend: string){
        console.log("deny request component");
        var Friend = {'username': tempFriend};
         this.userService.denyRequest(Friend).subscribe(
                       error =>  this.errorMessage = <any>error);
        this.findRequests();
    }

}
