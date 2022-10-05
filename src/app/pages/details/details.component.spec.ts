
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DetailsComponent } from './details.component';

import { AppTitleComponent } from '@shared/_spec-tools/components/app-title.component.spec';
import { Structure } from '@core/interfaces/strucuture';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        DetailsComponent,

        AppTitleComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('expects "handleStructureChange" to take a structure and set the appropriate variables', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };

    component.handleStructureChange(structure);
    expect(component._structure).toEqual(structure);
    expect(component.useNotes).toEqual(false);
    expect(component.days).toEqual(structure.days);
  });

  it('expects "toggleUseNotes" to send an adjusted structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;

    component.toggleUseNotes();
    expect(structure.useNotes).toEqual(true);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "toggleEdit" to simply change the boolean state of editVisible', () => {
    component.editVisible = true;
    component.toggleEdit();
    expect(component.editVisible).toEqual(false);
    component.toggleEdit();
    expect(component.editVisible).toEqual(true);
  });

  it('expects "saveNote" to do nothing if useNotes is TRUE and note is empty', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;
    const note: string = '';

    component.saveNote(index, note);
    expect(component['storage'].structureChange).not.toHaveBeenCalled();
  });

  it('expects "saveNote" to save if useNotes is TRUE and note has content', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;
    const note: string = 'NEW-NOTE';

    component.saveNote(index, note);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "saveNote" to save if useNotes is FALSE and note is empty', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.useNotes = false;
    const index: number = 0;
    const note: string = '';

    component.saveNote(index, note);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "saveNote" to save if useNotes is FALSE and note has content', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.useNotes = false;
    const index: number = 0;
    const note: string = 'NEW-NOTE';

    component.saveNote(index, note);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

});
