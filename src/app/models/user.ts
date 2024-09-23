export class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  balance: number;
  transactions: string[];

  constructor(firstName: string, lastName: string, username: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.balance = 0;
    this.transactions = [];
  } 
}
