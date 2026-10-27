import { Routes } from '@angular/router';
import { ItemsList } from './features/items/items-list/items-list';
import { ItemDetail } from './item-detail/item-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'materiel', pathMatch: 'full' },
  { path: 'materiel', title: 'Catalogue | Prêt de matériel', component: ItemsList },

  { path: 'materiel/:id', title: 'Détail du matériel | Prêt de matériel', component: ItemDetail },
];
