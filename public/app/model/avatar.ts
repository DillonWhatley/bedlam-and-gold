import {InventoryItem} from './inventory-item';

export interface Avatar {
  id: number;
  name: string;
  avatarClass: string;
  strength: number;
  dexterity: number;
  intelligence: number;
  luck: number;
  endurance: number;
  charisma: number;
  inventory: Array<InventoryItem>;
}
