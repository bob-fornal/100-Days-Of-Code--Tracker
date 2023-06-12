import { TestBed } from '@angular/core/testing';

import { ImageRoutingService } from './image-routing.service';

describe('ImageRoutingService', () => {
  let service: ImageRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
