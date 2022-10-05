
import { Component } from "@angular/core";

@Component({
  template: '<div class="mock" appDragAndDrop (fileDropped)="onFileDropped($event)"></div>'
})
export class MockDragAndDropComponent {
  fileDropped: boolean = false;
  onFileDropped(event: any) {
    this.fileDropped = true;
  }
}
