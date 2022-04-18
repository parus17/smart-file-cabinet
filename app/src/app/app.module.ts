import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from "primeng/divider";
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';

import { BoekenComponent } from './components/boeken/boeken.component';
import { StripsComponent } from './components/strips/strips.component';
import { ReceptenComponent } from './components/recepten/recepten.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    BoekenComponent,
    StripsComponent,
    ReceptenComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    DividerModule,
    MenubarModule,
    SharedModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
