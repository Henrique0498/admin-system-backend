export interface User {
  readonly _id: string;
  readonly email: string;
  readonly name: string;
  readonly username: string;
  lastAccess: string | null;
  expensesTotal: string | null;
  spendingTotal: string | null;
  expenses: [] | null;
  spending: [] | null;
  cards: [] | null;
  earnings: [] | null;
  income: [] | null;
}
