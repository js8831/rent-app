import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Loan } from '../../models/loan';

const API_URL = '/api/loans';

interface LoanResponse {
  id: number;
  itemId: number;
  borrower: string;
  borrowerEmail: string;
  startDate: string;
  dueDate: string;
  returnedAt: string | null;
}

export type LoanDraft = Omit<LoanResponse, 'id' | 'returnedAt'>;

@Service()
export class LoanApi {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Loan[]> {
    return this.http
      .get<LoanResponse[]>(API_URL)
      .pipe(map((loans) => loans.map((data) => this.toLoan(data))));
  }

  create(draft: LoanDraft): Observable<Loan> {
    return this.http.post<LoanResponse>(API_URL, draft).pipe(map((data) => this.toLoan(data)));
  }

  private toLoan(data: LoanResponse): Loan {
    return {
      ...data,
      startDate: new Date(`${data.startDate}T00:00:00`),
      dueDate: new Date(`${data.dueDate}T00:00:00`),
      returnedAt: data.returnedAt === null ? null : new Date(`${data.returnedAt}T00:00:00`),
    };
  }
}
