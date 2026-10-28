import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../../../models/item';
import { Loan } from '../../../models/loan';
import { availability } from '../../../shared/loan-rules';

@Component({
  imports: [RouterLink],
  selector: 'app-item-card',
  styleUrl: './item-card.css',
  templateUrl: './item-card.html',
})
export class ItemCard {
  readonly item = input.required<Item>();
  readonly loans = input.required<Loan[]>();

  protected readonly itemAvailability = computed(() => availability(this.item(), this.loans()));
}
