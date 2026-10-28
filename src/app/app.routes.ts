import { Routes } from '@angular/router';
import { ItemDetail } from './features/items/item-detail/item-detail';
import { ItemsList } from './features/items/items-list/items-list';
import { LoanForm } from './features/loans/loan-form/loan-form';

export const routes: Routes = [
  { path: '', redirectTo: 'materiel', pathMatch: 'full' },
  { path: 'materiel', title: 'Catalogue | Prêt de matériel', component: ItemsList },
  {
    path: 'materiel/:id/preter',
    title: 'Prêter un matériel | Prêt de matériel',
    component: LoanForm,
  },
  { path: 'materiel/:id', title: 'Détail du matériel | Prêt de matériel', component: ItemDetail },
];
