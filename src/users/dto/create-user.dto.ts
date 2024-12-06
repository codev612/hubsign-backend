export class CreateUserDto {
    readonly email: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly phonenumber: string;
    readonly password: string;string;
    readonly role: string;
    readonly status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
  }