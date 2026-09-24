export class accountEntity {
  private readonly id: string;
  private provider: string;
  private providerAccountId?: string;
  private password?: string;
  private userId: string;

  constructor(
    id: string,
    provider: string,
    userId: string,
    providerAccountId?: string,
    password?: string
  ) {
    this.id = id;
    this.provider = provider;
    this.userId = userId;
    this.providerAccountId = providerAccountId;
    this.password = password;
  }

  getId(): string {
    return this.id;
  }

  getProvider(): string {
    return this.provider;
  }

  getProviderAccountId(): string | undefined {
    return this.providerAccountId;
  }

  getPassword(): string | undefined {
    return this.password;
  }

  getUserId(): string {
    return this.userId;
  }

  setProvider(provider: string): void {
    this.provider = provider;
  }

  setProviderAccountId(providerAccountId?: string): void {
    this.providerAccountId = providerAccountId;
  }

  setPassword(password?: string): void {
    this.password = password;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}

