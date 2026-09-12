export class userEntity {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private roleId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    roleId: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRoleId(): string {
    return this.roleId;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setRoleId(roleId: string): void {
    this.roleId = roleId;
  }
}