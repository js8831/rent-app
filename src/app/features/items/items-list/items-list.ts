import { Component, inject } from '@angular/core';
import { ItemApi } from '../../../core/item-api';
import { httpResource } from '@angular/common/http';
import { Item } from '../../../models/item';

@Component({
  imports: [],
  selector: 'app-items-list',
  styleUrl: './items-list.css',
  templateUrl: './items-list.html',
})
export class ItemsList {
  itemsService = inject(ItemApi);
  items = httpResource<Item[]>(() => '/api/items');
}
