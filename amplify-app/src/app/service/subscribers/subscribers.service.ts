import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { SubscriberModel } from './../../models/subscriber.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private http: HttpClient) { }

  getSubscribers() {
    //return this.http.get<SubscriberModel[]>('assets/subscribers.json');
    return this.http.get<SubscriberModel[]>(environment.api+'subscriber');
  }

  createSubscribers(user: SubscriberModel) {
    //[TASK] here i fetcing again to get last ID, need to find out how to increment it in DB
    // @ts-ignore
    const id = +window.localStorage.getItem('id')+1;
    user = {...user, id: id};
    return this.http.post(environment.api+'subscriber', JSON.stringify(user), {headers: {'Content-Type': 'application/json'}});
  }

  getSubscriberById(id: number) {
    return this.http.get(`${environment.api}subscriber/${id}`);
  }
}
