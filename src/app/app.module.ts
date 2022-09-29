
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { GoalsComponent } from './pages/goals/goals.component';

import { MenuComponent } from './features/menu/menu.component';
import { TitleComponent } from './shared/title/title.component';
import { ItemSvgComponent } from './shared/item-svg/item-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    GoalsComponent,
    MenuComponent,
    TitleComponent,
    ItemSvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
