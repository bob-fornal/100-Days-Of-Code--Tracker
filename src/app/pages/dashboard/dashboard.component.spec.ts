import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

import { AppTitleComponent } from '@shared/_spec-tools/components/app-title.component.spec';
import { DaysModalComponent } from '@shared/_spec-tools/components/days-modal.component.spec';
import { ItemImageComponent } from '@shared/_spec-tools/components/item-image.component.spec';
import { Structure } from '@core/interfaces/strucuture';

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

  it('expects "handleStructureData" to take a structure and set the appropriate variables', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };

    component.handleStructureChange(structure);

    expect(component._structure).toEqual(structure);
    expect(component.useGoals).toEqual(false);
    expect(component.useNotes).toEqual(false);
    expect(component.days).toEqual(structure.days);
    expect(component.goals).toEqual(structure.goals);
  });

});
