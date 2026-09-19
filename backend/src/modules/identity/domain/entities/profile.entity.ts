export class profileEntity {
    private readonly id: string;
    private fullName: string;
    private phone?: string;
    private address?: string;
    private gender?: string;
    private birthday?: Date;
    private bio?: string;
    private readonly userId: string;

    constructor(
        id: string,
        fullName: string,
        userId: string,
        phone?: string,
        address?: string,
        gender?: string,
        birthday?: Date,
        bio?: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.userId = userId;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.birthday = birthday;
        this.bio = bio;
    }

    getId(): string { return this.id; }
    getFullName(): string { return this.fullName; }
    getUserId(): string { return this.userId; }
    getPhone(): string | undefined { return this.phone; }
    getAddress(): string | undefined { return this.address; }
    getGender(): string | undefined { return this.gender; }
    getBirthday(): Date | undefined { return this.birthday; }
    getBio(): string | undefined { return this.bio; }

    setFullName(name: string): void { this.fullName = name; }
    setPhone(phone?: string): void { this.phone = phone; }
    setAddress(address?: string): void { this.address = address; }
    setGender(gender?: string): void { this.gender = gender; }
    setBirthday(birthday?: Date): void { this.birthday = birthday; }
    setBio(bio?: string): void { this.bio = bio; }
}
