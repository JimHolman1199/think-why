import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalConfig } from './modal.config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() public modalConfig!: ModalConfig;
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>;
  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async close(): Promise<void> {
    if (!this.modalConfig.shouldClose || (await this.modalConfig.shouldClose())) {
      const result = !this.modalConfig.onClose || (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (!this.modalConfig.shouldDismiss || (await this.modalConfig.shouldDismiss())) {
      const result = !this.modalConfig.onDismiss || (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }
}
