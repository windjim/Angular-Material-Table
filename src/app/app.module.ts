// 官方元件
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


// 自訂元件
import { AppComponent } from './app.component'
import { MaterialModule } from './modules/material.module';

// 自訂通道
import { MatTableComponent } from './mat-table/mat-table.component';
import { TableComponent } from './table/table.component';
import { JsonKeyPipe } from './json-key.pipe';
import { ExpansionTableComponent } from './expansion-table/expansion-table.component';




@NgModule({
  declarations: [
    AppComponent,
    MatTableComponent,
    TableComponent,
    JsonKeyPipe,
    ExpansionTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
