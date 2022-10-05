
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropDirective } from './drag-and-drop.directive';

import { MockDragAndDropComponent } from '@shared/_spec-tools/components/drag-and-drop.component.spec';

describe('DragAndDropDirective', () => {
  let component: MockDragAndDropComponent;
  let fixture: ComponentFixture<MockDragAndDropComponent>;
  let inputElement: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DragAndDropDirective,
        MockDragAndDropComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDragAndDropComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('.mock'));
    fixture.detectChanges();
  });

  it('expects dragover to add highlight class', () => {
    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');

    inputElement.triggerEventHandler('dragover', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(inputElement.nativeElement.classList.contains('highlight')).toEqual(true);
  });

  it('expects dragleave to remove highlight class', () => {
    const event = new DragEvent('dragleave');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');

    inputElement.triggerEventHandler('dragleave', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(inputElement.nativeElement.classList.contains('highlight')).toEqual(false);
  });

  it('expects drop to do nothing else if there are no files', () => {
    const dataTransfer = new DataTransfer();
    const event = new DragEvent('drop', { dataTransfer });
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    spyOn(component, 'onFileDropped').and.stub();

    inputElement.triggerEventHandler('drop', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.onFileDropped).not.toHaveBeenCalled();
  });

  it('expects drop to pass files', () => {
    const file = new File([''], 'file.json');
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const event = new DragEvent('drop', { dataTransfer });
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    spyOn(component, 'onFileDropped').and.stub();

    inputElement.triggerEventHandler('drop', event);
    fixture.detectChanges();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.onFileDropped).toHaveBeenCalled();
  });

});
