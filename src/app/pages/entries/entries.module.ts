import { NgModule } from '@angular/core';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntriesRoutingModule } from './entries-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [EntryListComponent,EntryFormComponent],
  imports: [
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
    SharedModule
  ]
})
export class EntriesModule { }
