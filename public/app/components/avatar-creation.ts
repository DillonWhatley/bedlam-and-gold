import {Component, OnInit} from 'angular2/core';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Avatar} from '../model/avatar';
import {InventoryItem} from '../model/inventory-item';
import {AvatarService} from '../services/avatar-service';

@Component({
    selector: 'avatar-creation',
    template: `
    <div >
      <h1>Avatar Creation</h1>
      <ul>
        <li *ngFor="#avatar of avatars">
          <div>
            {{avatar.name}}
          </div>
        </li>
      </ul>
    </div>
    `,
    styles: [`
      div {
        background-color: #60A3A0;
        color:white;
        padding: 5px;
        height: 25px;
      }
      `],
      providers: [AvatarService]
})
export class AvatarCreationComponent implements OnInit{
    private newAvatar: Avatar;
    private avatars: Avatar[];
    private errorMessage: string;

    constructor(private http: Http, private avatarService: AvatarService) { }


    createAvatar() {
        this.avatarService.createAvatar(this.newAvatar).subscribe(
          () =>  this.findAvatars(),
          error => this.errorMessage = <any>error
        );
    }
    findAvatars() {
      this.avatarService.findAvatars().subscribe(
        avatars => this.avatars = avatars,
        error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
      console.log("retrieving avatars");
      this.findAvatars();
    }

}
