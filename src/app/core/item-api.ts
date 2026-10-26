import { inject, Service } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/items';

@Service()
export class ItemApi {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${API_URL}`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${API_URL}/${id}`);
  }
}
