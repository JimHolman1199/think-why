import { ModalConfig } from './../shared/modal/modal.config';
import { SubscriberModel } from './../../models/subscriber.model';
import { SubscribersService } from './../../service/subscribers/subscribers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('modal') private modalComponent!: ModalComponent
  public subscribers: SubscriberModel[] = [];
  public modalConfig: ModalConfig = {
    modalTitle: 'Create contact',
    closeButtonLabel: 'Close',
    hideDismissButton: true,
  }
  constructor(private subscribersService:SubscribersService) { }
  
  ngOnInit(): void {
    this.subscribersService.getSubscribers()
      .pipe(take(1))
      .subscribe( data => this.subscribers = data);
  }

  async onCreateContact() {
    return await this.modalComponent.open()
  }

}
