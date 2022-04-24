import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatService } from './service/boat.service';
import { BoatListComponent } from './boat-list/boat-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoatNewComponent } from './boat-new/boat-new.component';

@NgModule({
  declarations: [
    BoatListComponent,
    BoatEditComponent,
    BoatNewComponent
  ],
  providers: [
    BoatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  imports: [ CommonModule, 
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class BoatModule { }
