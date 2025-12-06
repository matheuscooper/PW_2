import { uuidv7 } from "uuidv7";

export type PurchaseProps = {
  id?: string;
  userId: string;
  total: number;
  createdAt?: Date;
};

export class Purchase {
  private constructor(public props: PurchaseProps) {}

  static create(props: Omit<PurchaseProps, "id">, id?: string) {
    return new Purchase({ ...props, id: id ?? uuidv7() });
  }
}
