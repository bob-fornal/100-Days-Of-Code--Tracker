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

    constructor(private modalService: ModalService, private el: ElementRef) {
      this.element = el.nativeElement;
    }

    ngOnInit(): void {
      if (!this.id) {
        console.error('modal must have an id');
        return;
      }

      document.body.appendChild(this.element);

      this.element.addEventListener('click', (el: any) => {
        if (['days-modal', 'days-modal-background'].includes(el.target.className) === true) {
          this.close();
        }
      });

      this.modalService.add(this);
    }

    ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
    }

    open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('days-modal-open');
    }

    close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('days-modal-open');
    }
}