export type UserTypeProps = {
  id?: string;
  name: "admin" | "cliente";
};

export class UserType {
  private constructor(public props: UserTypeProps) {}

  static create(props: UserTypeProps, id?: string) {
    return new UserType({ ...props, id });
  }
}
