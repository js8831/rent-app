import { Component, inject } from '@angular/core';
import { ItemApi } from '../../../core/item-api';

@Component({
  imports: [],
  selector: 'app-items-list',
  styleUrl: './items-list.css',
  templateUrl: './items-list.html',
})
export class ItemsList {
  protected readonly itemsService = inject(ItemApi);
  protected items;
}
