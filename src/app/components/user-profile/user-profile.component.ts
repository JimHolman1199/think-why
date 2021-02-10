import { AlertService } from 'src/app/service/alert/alert.service';
import { SubscriberModel } from './../../models/subscriber.model';
import { take } from 'rxjs/operators';
import { Component, Input, OnChanges } from '@angular/core';
import { SubscribersService } from 'src/app/service/subscribers/subscribers.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnChanges {
  @Input() id!: number;
  public user!: SubscriberModel;
  constructor(private subscribersService: SubscribersService,
              private alertService: AlertService) { }

  ngOnChanges(): void {
    // [NOTE] I am getting user data again to show that BE APis is working
    this.subscribersService.getSubscriberById(this.id)
      .pipe(take(1))
      .subscribe(
        (user) => {
          this.user = user[0];
          this.alertService.info('User data successfully received', {autoClose: true});
        },
        err => {
          this.alertService.error(err.message, {autoClose: true});
        });
  }
}
