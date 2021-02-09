import { SubscribersService } from './../../service/subscribers/subscribers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/service/alert/alert.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  public contactForm!: FormGroup;

  constructor(private modalService: NgbModal,
              private subscribersService: SubscribersService,
              protected alertService: AlertService) {
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const options = {
      autoClose: true,
      keepAfterRouteChange: false
    };

    const user = this.contactForm.value;
    this.subscribersService.createSubscribers(user)
      .pipe(take(1))
      .subscribe(res => {
        const currSubscribers = this.subscribersService.subscribersSubject.value;
        this.alertService.success(res.message, options);
        this.contactForm.reset();
        this.subscribersService.subscribersSubject.next([...currSubscribers, res.data]);
        this.modalService.dismissAll();
      }, err => {
        this.alertService.error(err.message, options);
      });
  }
}
