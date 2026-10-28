import { computed, inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from '../../models/item';
import { Loan } from '../../models/loan';
import { availability } from '../../shared/loan-rules';
import { ItemApi } from '../api/item-api';
import { LoanApi, LoanDraft } from '../api/loan-api';

@Service()
export class Store {
  private readonly itemApi = inject(ItemApi);
  private readonly loanApi = inject(LoanApi);

  readonly items = signal<Item[]>([]);
  readonly loans = signal<Loan[]>([]);
  readonly itemsLoading = signal(false);
  readonly loansLoading = signal(false);
  readonly itemsError = signal<string | null>(null);
  readonly loansError = signal<string | null>(null);

  readonly availableItems = computed(() =>
    this.items().filter((item) => availability(item, this.loans()) === 'available'),
  );

  async loadItems(): Promise<void> {
    if (this.itemsLoading()) {
      return;
    }

    this.itemsLoading.set(true);
    this.itemsError.set(null);

    try {
      const items = await firstValueFrom(this.itemApi.getAll());
      this.items.set(items);
    } catch {
      this.itemsError.set('Impossible de charger les matériels.');
    } finally {
      this.itemsLoading.set(false);
    }
  }

  async loadLoans(): Promise<void> {
    if (this.loansLoading()) {
      return;
    }

    this.loansLoading.set(true);
    this.loansError.set(null);

    try {
      const loans = await firstValueFrom(this.loanApi.getAll());
      this.loans.set(loans);
    } catch {
      this.loansError.set('Impossible de charger les prêts.');
    } finally {
      this.loansLoading.set(false);
    }
  }

  async addLoan(draft: LoanDraft): Promise<Loan> {
    const loan = await firstValueFrom(this.loanApi.create(draft));
    this.loans.update((loans) => [...loans, loan]);
    return loan;
  }
}
