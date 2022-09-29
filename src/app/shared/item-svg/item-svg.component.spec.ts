import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSvgComponent } from './item-svg.component';

describe('ItemSvgComponent', () => {
  let component: ItemSvgComponent;
  let fixture: ComponentFixture<ItemSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
