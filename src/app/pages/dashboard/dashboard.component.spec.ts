import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

import { AppTitleComponent } from '@shared/_spec-tools/components/app-title.component.spec';
import { DaysModalComponent } from '@shared/_spec-tools/components/days-modal.component.spec';
import { ItemImageComponent } from '@shared/_spec-tools/components/item-image.component.spec';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        DashboardComponent,

        AppTitleComponent,
        DaysModalComponent,
        ItemImageComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
