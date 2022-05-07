import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";

import {BoekenComponent} from './components/boeken/boeken.component';
import {StripsComponent} from './components/strips/strips.component';
import {ReceptenComponent} from './components/recepten/recepten.component';
import {NotfoundComponent} from './components/notfound/notfound.component';

import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
