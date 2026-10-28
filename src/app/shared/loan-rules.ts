import { Item } from '../models/item';
import { Loan } from '../models/loan';

export type Availability = 'available' | 'maintenance';

export function isLoaned(item: Item, loans: readonly Loan[]): boolean {
  return loans.some((loan) => loan.itemId === item.id && loan.returnedAt === null);
}

export function availability(item: Item, loans: readonly Loan[]): Availability {
  return isLoaned(item, loans) ? 'maintenance' : 'available';
}

export function isOverdue(loan: Loan, today: Date): boolean {
  const dueDay = new Date(loan.dueDate);
  const currentDay = new Date(today);

  dueDay.setHours(0, 0, 0, 0);
  currentDay.setHours(0, 0, 0, 0);

  return loan.returnedAt === null && dueDay.getTime() < currentDay.getTime();
}

export function isValidLoanPeriod(startDate: Date, dueDate: Date, today: Date): boolean {
  const startDay = new Date(startDate);
  const dueDay = new Date(dueDate);
  const currentDay = new Date(today);

  startDay.setHours(0, 0, 0, 0);
  dueDay.setHours(0, 0, 0, 0);
  currentDay.setHours(0, 0, 0, 0);

  const latestDueDay = new Date(currentDay);
  latestDueDay.setDate(latestDueDay.getDate() + 14);

  return (
    startDay.getTime() === currentDay.getTime() &&
    dueDay.getTime() > currentDay.getTime() &&
    dueDay.getTime() <= latestDueDay.getTime()
  );
}
