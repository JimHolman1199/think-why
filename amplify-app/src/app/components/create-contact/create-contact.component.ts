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
  public contactForm: FormGroup;

  constructor(private modalService: NgbModal,
              private subscribersService: SubscribersService,
              protected alertService: AlertService) {
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const options = {
      autoClose: true,
      keepAfterRouteChange: false
    };

    const user = this.contactForm.value;
    this.subscribersService.createSubscribers(user)
      .pipe(take(1))
      .subscribe(data => {
        this.alertService.success('Nice, new user successfully created!', options);
        this.modalService.dismissAll();
        this.contactForm.reset();
      }, err => {
        this.alertService.error(err.message, options)
      })
  }

}
