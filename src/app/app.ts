import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsList } from './features/items/items-list/items-list';

@Component({
  imports: [RouterOutlet, ItemsList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('rent-app');
}
