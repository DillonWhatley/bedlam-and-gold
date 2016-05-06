import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {InventoryItem}              from '../../../model/inventory-item';
import {InventoryService}       from '../../../services/inventory-service';
import { Router } from 'angular2/router';

@Component({
    selector: 'bag-inventory',
    template: `
   <div id="flex-container">
        <ul>
          <li *ngFor="#item of inventory">
            <div>{{item.name}}: {{item.count}}</div>
          </li>
        </ul>
    </div>
    `,
    styles: [`

      `]
})
export class InventoryComponent implements OnInit{
  errorMessage: string;
  inventoryItems: InventoryItem[];

  constructor(private inventoryService: InventoryService, private _router: Router){
  }

  ngOnInit() {
    var username = "bob";
    this.findInventoryItemsByUser(username);
  }
  findInventoryItemsByUser(username) {
    this.inventoryService.findByUser(username)
                     .subscribe(
                       inventoryItems => this.inventoryItems = inventoryItems,
                       error =>  this.errorMessage = <any>error);
  }
}
