import { AlertService } from './../../service/alert/alert.service';
import { ModalConfig } from './../shared/modal/modal.config';
import { SubscriberModel } from './../../models/subscriber.model';
import { SubscribersService } from './../../service/subscribers/subscribers.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../shared/modal/modal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('modal') private modalComponent!: ModalComponent;
  public subscribers: SubscriberModel[] = [];
  private destroySub: Subject<boolean> = new Subject<boolean>();
  public modalConfig: ModalConfig = {
    modalTitle: 'Create contact',
    closeButtonLabel: 'Close',
    hideDismissButton: true,
  };
  public loading = true;

  constructor(private subscribersService: SubscribersService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onCreateContact(): any {
    return this.modalComponent.open();
  }

  fetchData(): void {
    this.subscribersService.getSubscribers();
    this.subscribersService.subscribersSubject
      .pipe(takeUntil(this.destroySub))
      .subscribe( data => {
        this.subscribers = data;
        this.loading = false;
      }, err => {
        this.alertService.error(err.message, {autoClose: true});
      });
  }

  ngOnDestroy(): void {
    this.destroySub.next(true);
    this.destroySub.unsubscribe();
  }
}
