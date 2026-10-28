import { Component, inject, OnInit } from '@angular/core';
import { Store } from '../../../core/stores/store';
import { ItemCard } from '../item-card/item-card';

@Component({
  imports: [ItemCard],
  selector: 'app-items-list',
  styleUrl: './items-list.css',
  templateUrl: './items-list.html',
})
export class ItemsList implements OnInit {
  protected readonly store = inject(Store);

  ngOnInit(): void {
    this.store.loadItems();
    this.store.loadLoans();
  }
}
