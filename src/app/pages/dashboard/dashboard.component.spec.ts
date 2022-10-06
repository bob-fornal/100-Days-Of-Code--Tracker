
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

import { AppTitleComponent } from '@shared/_spec-tools/components/app-title.component.spec';
import { DaysModalComponent } from '@shared/_spec-tools/components/days-modal.component.spec';
import { ItemImageComponent } from '@shared/_spec-tools/components/item-image.component.spec';
import { Structure } from '@core/interfaces/strucuture';

class MockFileReader {
  onload: any;
  readAsText(file: string) { }
}

describe('DashboardComponent', () => {
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

  it('expects "toggleUseGoals" to send an adjusted structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;

    component.toggleUseGoals();
    expect(structure.useGoals).toEqual(true);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
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

  it('expects "toggleGoal" to send an adjustment to structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.goals = structure.goals;
    const index: number = 0;

    component.toggleGoal(index);
    expect(structure.goals[index].done).toEqual(true);
    expect(component.goals).toEqual(structure.goals);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "toggleDay" to simply store the toggle if useNotes is FALSE', () => {
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

    component.toggleDay(index);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expecets "toggleDay" to open the modal if it becomes done and there is no note', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: '', done: false }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['modalService'], 'open').and.stub();
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;

    component.toggleDay(index);
    expect(component._structure.days[index].done).toEqual(true);
    expect(component['modalService'].open).toHaveBeenCalledWith('getNotesModal');
  });

  it('expects "toggleDay" to clear the note and store', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: true }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    spyOn(component['storage'], 'structureChange').and.stub();
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;
  
    component.toggleDay(index);
    expect(component._structure.days[index].done).toEqual(false);
    expect(component._structure.days[index].note).toEqual('')
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "closeNotesModal" to set the selected index day, store the structure, and close the modal', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: true }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    component.selectedIndex = 0;
    component.selectedDay = { number: 1, note: 'NEW-NOTE', done: true };
    spyOn(component['storage'], 'structureChange').and.stub();
    spyOn(component['modalService'], 'close').and.stub();

    component.closeNotesModal();
    expect(component._structure.days[0].note).toEqual('NEW-NOTE');
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
    expect(component['modalService'].close).toHaveBeenCalled();
  });

  it('expects "saveData" to set the filename and open the getFilename modal', () => {
    spyOn(component, 'setFilename').and.stub();
    spyOn(component['modalService'], 'open').and.stub();

    component.saveData();
    expect(component.setFilename).toHaveBeenCalledWith(jasmine.any(String));
    expect(component['modalService'].open).toHaveBeenCalledWith('getFilename');
  });

  it('expects "setFilename" to configure the selectFilename variable', () => {
    const date: string = 'DATE';

    component.setFilename(date);
    expect(component.selectFilename).toEqual('100DaysOfCode--DATE.json');
  });

  it('expects "closeGetFilename" to get filename and anchor, process, then close the modal', () => {
    component.selectFilename = 'TEST.json';
    spyOn(component, 'processDownload').and.stub();
    spyOn(component['modalService'], 'close').and.stub();

    component.closeGetFilename();
    expect(component.processDownload).toHaveBeenCalled();
    expect(component['modalService'].close).toHaveBeenCalledWith('getFilename');
  });

  it('expects "processDownload" to create a Blob on an anchor, attach the anchor to the DOM, click it, then remove it', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: true }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    component._structure = structure;
    let _type = '';
    let _filename = '';
    const _document: any = {
      body: {
        appendChild: () => {},
        removeChild: () => {}
      }
    };
    const _a: any = {
      click: () => {},
      setAttribute: (type: string, filename: string) => {
        _type = type;
        _filename = filename;
      }
    };
    const filename: string = 'FILENAME.json';
    spyOn(_document.body, 'appendChild').and.stub();
    spyOn(_document.body, 'removeChild').and.stub();
    spyOn(_a, 'click').and.stub();

    component.processDownload(_document, _a, filename);
    expect(_type).toEqual('download');
    expect(_filename).toEqual(filename);
    expect(_document.body.appendChild).toHaveBeenCalled();
    expect(_a.click).toHaveBeenCalled();
    expect(_document.body.removeChild).toHaveBeenCalled();
  });

  it('expects "checkFilename" to add an extension if one does not exist', () => {
    const filename: string = 'FILENAME';

    const result: string = component.checkFilename(filename);
    expect(result).toEqual('FILENAME.json');
  });

  it('expects "checkFilename" to keep the extension if it exist', () => {
    const filename: string = 'FILENAME.json';

    const result: string = component.checkFilename(filename);
    expect(result).toEqual('FILENAME.json');
  });

  it('expects "loadData" to open the loadFile modal', () => {
    spyOn(component['modalService'], 'open').and.stub();

    component.loadData();
    expect(component['modalService'].open).toHaveBeenCalledWith('loadFile');
  });

  it('expects "cancelLoadFile" to close the loadFile modal', () => {
    spyOn(component['modalService'], 'close').and.stub();

    component.cancelLoadFile();
    expect(component['modalService'].close).toHaveBeenCalledWith('loadFile');
  });

  it('expects "onFileSelected" to pass the files to onFileDropped', () => {
    const file: File = new File([''], 'filename', { type: 'text/html' });
    const event: any = { target: { files: [file] } };
    spyOn(component, 'onFileDropped').and.stub();

    component.onFileSelected(event);
    expect(component.onFileDropped).toHaveBeenCalledWith([file]);
  });

  it('expects "onFileSelected" to not pass the files to onFileDropped when null', () => {
    const event: any = { target: { files: null } };
    spyOn(component, 'onFileDropped').and.stub();

    component.onFileSelected(event);
    expect(component.onFileDropped).not.toHaveBeenCalled();
  });

  it('expects "onFileDropped" to process the file and close the modal', () => {
    const files: any = {
      item: (index: number): string => 'FILE-OBJECT'
    };
    spyOn(component, 'processFileRead').and.stub();
    spyOn(component['modalService'], 'close').and.stub();

    component.onFileDropped(files);
    expect(component.processFileRead).toHaveBeenCalledWith(jasmine.any(Function), files);
    expect(component['modalService'].close).toHaveBeenCalledWith('loadFile');
  });

  it('expects "processReadFile" to setup and start the upload of the file', () => {
    const files: any = {
      item: (index: number): string => 'FILE-OBJECT'
    };
    spyOn(component, 'processFileReader').and.stub();

    component.processFileRead(MockFileReader, files);
    expect(component.processFileReader).toHaveBeenCalledWith(jasmine.any(Object), files);
  });

  it('expects "processFileReader" to attach the onload and trigger the read', () => {
    const fileReader: any = new MockFileReader();
    const files: any = {
      item: (index: number): string => 'FILE-OBJECT'
    };
    spyOn(fileReader, 'readAsText').and.stub();

    component.processFileReader(fileReader, files);
    expect(fileReader.onload).toEqual(jasmine.any(Function));
    expect(fileReader.readAsText).toHaveBeenCalledWith('FILE-OBJECT');
  });

  it('expects "processOnLoad" to take an event and update the structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [{ number: 1, note: 'NOTE', done: true }],
      goals: [{ description: 'DESCRIPTION', done: false }]
    };
    const event: any = {
      target: {
        result: JSON.stringify(structure)
      }
    };
    component._structure = null;
    spyOn(component['storage'], 'structureChange').and.stub();

    component.processOnLoad(event);
    expect(component['storage'].structureChange).toHaveBeenCalledWith(structure);
  });
});
