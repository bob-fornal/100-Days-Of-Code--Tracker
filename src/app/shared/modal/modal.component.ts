import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({ 
  selector: 'days-modal', 
  templateUrl: 'modal.component.html', 
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

    @Input() id: string = '';
    private element: any;

    doc = document;

    constructor(
      private modalService: ModalService,
      private el: ElementRef
    ) {
      this.element = el.nativeElement;
    }

    ngOnInit(): void {
      this.init();
    }

    ngOnDestroy(): void {
      this.destroy();
    }

    init = (): void => {
      this.doc.body.appendChild(this.element);
      this.element.addEventListener('click', this.handleClick);
      this.modalService.add(this);
    };

    destroy = (): void => {
      this.modalService.remove(this.id);
      this.element.remove();
    };

    handleClick = (element: any): void => {
      if (['days-modal', 'days-modal-background'].includes(element.target.className) === true) {
        this.close();
      }
    }

    open(): void {
      this.element.style.display = 'block';
      this.doc.body.classList.add('days-modal-open');
    }

    close(): void {
      this.element.style.display = 'none';
      this.doc.body.classList.remove('days-modal-open');
    }
}