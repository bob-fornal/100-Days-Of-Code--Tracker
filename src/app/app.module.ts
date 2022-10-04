
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { GoalsComponent } from './pages/goals/goals.component';

import { MenuComponent } from './features/menu/menu.component';
import { TitleComponent } from './shared/title/title.component';
import { ItemImageComponent } from './shared/item-image/item-image.component';

import { ModalModule } from '@shared/modal/modal.module';
import { DragAndDropDirective } from './shared/drag-and-drop.directive';
import { ImagesComponent } from './shared/images/images.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    GoalsComponent,
    MenuComponent,
    TitleComponent,
    ItemImageComponent,
    DragAndDropDirective,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
