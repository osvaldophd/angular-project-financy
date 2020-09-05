import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
