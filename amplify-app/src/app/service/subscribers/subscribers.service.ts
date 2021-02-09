import { SubscriberModel } from './../../models/subscriber.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private http: HttpClient) { }

  getSubscribers() {
    // [TASK] add real DB
    return this.http.get<SubscriberModel[]>('assets/subscribers.json');
  }

  createSubscribers(user: SubscriberModel) {
    // [TASK] add real DB
    // return this.http.post('whaat', JSON.stringify(user));
    console.log(user)
  }
}
