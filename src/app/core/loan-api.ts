import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';
import { catchError, throwError } from 'rxjs';

const API_URL = '/api/loans';

@Service()
export class LoanApi {
  private readonly http = inject(HttpClient);

  getLoan(itemId?: number, _expand?: string): Observable<Loan[]> {
    let params = new HttpParams();
    if (itemId !== undefined) {
      params = params.set('itemId', itemId.toString());
    }
    if (_expand) {
      params = params.set('_expand', _expand);
    }

    return this.http.get<Loan[]>(API_URL, { params }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des prêts :', error);
        // On propage une erreur propre que le composant pourra afficher si besoin
        return throwError(
          () => new Error('Impossible de charger les prêts. Veuillez réessayer plus tard.'),
        );
      }),
    );
  }

  // createLoan();

  // returnLoan();
}
