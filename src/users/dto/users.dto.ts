export class CreateUserDto {}

export class UserDto {
  public email: string;

  public accessToken: string;

  public refreshToken: string;

  public nickname: string;

  public provider: string;

  public disabled: boolean;

  public createdAt: Date;
}

export class FindByEmailAndProviderDto {
  email: string;
  provider: string;
}
