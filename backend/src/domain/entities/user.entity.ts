export class userEntity {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private roleId: string;


  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    roleId: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
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