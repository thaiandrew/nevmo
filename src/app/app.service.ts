import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  nevmoUser!: User;

  setUser(user: User) {
    this.nevmoUser = user;
  }

  getUser() {
    return this.nevmoUser;
  }

  deposit(amount: number) {
    this.nevmoUser.balance += amount;
    const date = new Date();
    const depositMessage = `@${this.nevmoUser.username} deposited $${amount} at ${date.toLocaleString()}`;
    this.nevmoUser.transactions.push(depositMessage);
}

  withdraw(amount: number) {
    this.nevmoUser.balance -= amount;
    const date = new Date();
    const withdrawMessage = `@${this.nevmoUser.username} withdrew $${amount} at ${date.toLocaleString()}`;
    this.nevmoUser.transactions.push(withdrawMessage);
  }

  send(username: string, amount: number) {
    this.nevmoUser.balance -= amount;
    const date = new Date();
    const sendMessage = `@${this.nevmoUser.username} sent $${amount} to @${username} at ${date.toLocaleString()}`;
    this.nevmoUser.transactions.push(sendMessage);

    // Need to add amount to receiver's account
  }
}