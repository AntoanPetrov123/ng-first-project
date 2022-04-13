export class User {
  constructor(
    public email: string,
    public id: string,
    public profileId: string,
    public posts: string[],
    public _token: string,
    public _tokenExpirationDate: Date //expire token date
  ) {}

//we can use getter function like User.tokens
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}