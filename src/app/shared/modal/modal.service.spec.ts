import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('expects "add" to push the modal into the list', () => {
    service['modals'] = [];
    const modal: any = { id: 'ID', data: 'MODAL' };

    service.add(modal);
    expect(service['modals']).toEqual([ modal ]);
  });

  it('expects "remove" to remove the modal with the ID', () => {
    const modal: any = { id: 'ID', data: 'MODAL' };
    service['modals'] = [ modal ];

    service.remove('ID');
    expect(service['modals']).toEqual([]);
  });

  it('expects "open" to get the modal and trigger open', () => {
    let triggered: boolean = false;
    const modal: any = {
      id: 'ID',
      open: () => {
        triggered = true;
      }
    };
    service['modals'] = [ modal ];

    service.open('ID');
    expect(triggered).toEqual(true);
  });

  it('expects "close" to get the modal and trigger close', () => {
    let triggered: boolean = false;
    const modal: any = {
      id: 'ID',
      close: () => {
        triggered = true;
      }
    };
    service['modals'] = [ modal ];

    service.close('ID');
    expect(triggered).toEqual(true);
  });

});
