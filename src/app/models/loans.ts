export interface Loans {
  id: number;
  itemId: number;
  borrower: string;
  borrowerEmail: string;
  startDate: Date;
  dueDate: Date;
  returnedAt: Date | null;
}
