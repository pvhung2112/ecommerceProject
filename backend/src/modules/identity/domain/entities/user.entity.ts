export class userEntity {
  private readonly id: string;
  private roleId: string;
  private email?: string;
  private status: string = "active";

  constructor(
    id: string,
    roleId: string,
    email?: string,
    status: string = "active"
  ) {
    this.id = id;
    this.roleId = roleId;
    this.email = email;
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getRoleId(): string {
    return this.roleId;
  }

  getEmail(): string | undefined {
    return this.email;
  }

  getStatus(): string {
    return this.status;
  }

  setEmail(email?: string): void {
    this.email = email;
  }

  setRoleId(roleId: string): void {
    this.roleId = roleId;
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
