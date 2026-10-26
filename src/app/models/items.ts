export type Category = `ordinateur` | `tablette` | `video` | `audio`;
export type Status = `available` | `maintenance`;

export interface Items {
  id: number;
  name: string;
  category: Category;
  serialNumber: string;
  status: Status;
}
