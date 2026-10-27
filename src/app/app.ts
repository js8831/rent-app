import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsList } from './features/items/items-list/items-list';
import { Loans } from './features/loans/loans';

@Component({
  imports: [RouterOutlet, ItemsList, Loans],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('rent-app');
}
