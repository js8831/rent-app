import { formatDate } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormField, FormRoot, email, form, required, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../../../core/stores/store';
import { availability, isValidLoanPeriod } from '../../../shared/loan-rules';

@Component({
  imports: [FormField, FormRoot, RouterLink],
  selector: 'app-loan-form',
  styleUrl: './loan-form.css',
  templateUrl: './loan-form.html',
})
export class LoanForm implements OnInit {
  protected readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly item = computed(() =>
    this.store.items().find((item) => item.id === Number(this.id())),
  );

  protected readonly available = computed(() => {
    const item = this.item();
    return item !== undefined && availability(item, this.store.loans()) === 'available';
  });

  private readonly draft = signal({ borrower: '', borrowerEmail: '', dueDate: '' });
  protected readonly submitAttempted = signal(false);
  protected readonly serverError = signal('');

  protected readonly loanForm = form(
    this.draft,
    (path) => {
      required(path.borrower, { message: "L'emprunteur est obligatoire." });
      required(path.borrowerEmail, { message: "L'e-mail est obligatoire." });
      email(path.borrowerEmail, { message: "L'adresse e-mail n'est pas valide." });
      required(path.dueDate, { message: 'La date de retour prévue est obligatoire.' });
      validate(path.dueDate, ({ value }) => {
        if (!value()) {
          return undefined;
        }
        const today = new Date();
        const dueDate = new Date(value() + 'T00:00:00');
        return isValidLoanPeriod(today, dueDate, today)
          ? undefined
          : { kind: 'period', message: 'Le retour doit être prévu entre demain et dans 14 jours.' };
      });
    },
    {
      submission: {
        action: async () => this.save(),
        onInvalid: () => this.submitAttempted.set(true),
      },
    },
  );

  ngOnInit(): void {
    this.store.loadItems();
    this.store.loadLoans();
  }

  private async save(): Promise<void> {
    this.serverError.set('');
    const item = this.item();
    if (!item || !this.available()) {
      this.serverError.set("Ce matériel n'est pas disponible pour un prêt.");
      return;
    }

    try {
      const draft = this.draft();
      await this.store.addLoan({
        itemId: item.id,
        borrower: draft.borrower.trim(),
        borrowerEmail: draft.borrowerEmail.trim(),
        startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        dueDate: draft.dueDate,
      });
      await this.router.navigate(['/materiel', item.id]);
      return;
    } catch {
      this.serverError.set("Impossible d'enregistrer le prêt. Réessayez.");
      return;
    }
  }
}
