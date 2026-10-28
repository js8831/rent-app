import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '../../../core/stores/store';
import { availability } from '../../../shared/loan-rules';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-item-detail',
  styleUrl: './item-detail.css',
  templateUrl: './item-detail.html',
})
export class ItemDetail implements OnInit {
  protected readonly store = inject(Store);

  readonly id = input.required<string>();

  protected readonly item = computed(() =>
    this.store.items().find((item) => item.id === Number(this.id())),
  );

  protected readonly loans = computed(() =>
    this.store
      .loans()
      .filter((loan) => loan.itemId === Number(this.id()))
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime()),
  );

  protected readonly itemAvailability = computed(() => {
    const item = this.item();
    return item ? availability(item, this.store.loans()) : undefined;
  });

  ngOnInit(): void {
    this.store.loadItems();
    this.store.loadLoans();
  }
}
