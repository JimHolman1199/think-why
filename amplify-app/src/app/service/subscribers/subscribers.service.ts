import { environment } from './../../../environments/environment';
import { SubscriberModel } from './../../models/subscriber.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  public subscribersSubject = new BehaviorSubject<SubscriberModel[]>([]);
  constructor(private http: HttpClient) { }

  getSubscribers(): void{
    this.http.get<SubscriberModel[]>(environment.api + 'subscriber')
      .subscribe(data => this.subscribersSubject.next(data));
  }

  createSubscribers(user: SubscriberModel) {
    // generate User id
    user = {...user, id: +this.subscribersSubject.value.length + 1};
    return this.http.post<{message: string, data: SubscriberModel}>(
      environment.api + 'subscriber',
      JSON.stringify(user),
      {headers: {'Content-Type': 'application/json'}});
  }

  getSubscriberById(id: number) {
    return this.http.get<SubscriberModel>(`${environment.api}subscriber/${id}`);
  }
}
