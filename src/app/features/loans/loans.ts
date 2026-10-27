import { Component, inject, OnInit, signal } from '@angular/core';
import { LoanApi } from '../../core/loan-api';
import { Loan } from '../../models/loan';

@Component({
  imports: [],
  selector: 'app-loans',
  styleUrl: './loans.css',
  templateUrl: './loans.html',
})
export class Loans implements OnInit {
  private readonly loanApi = inject(LoanApi);

  loans = signal<Loan[]>([]);

  ngOnInit() {
    this.loanApi.getLoan().subscribe({
      next: (data) => this.loans.set(data),
      error: (err) => console.error('Erreur lors du chargement des prêts', err),
    });
  }
}
