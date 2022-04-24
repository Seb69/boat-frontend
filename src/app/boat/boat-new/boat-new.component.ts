import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boat } from '../model/boat.model';
import { BoatService } from '../service/boat.service';

@Component({
  selector: 'app-boat-new',
  templateUrl: './boat-new.component.html',
  styleUrls: ['./boat-new.component.scss']
})
export class BoatNewComponent {

  boatForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
  })

  constructor(public dialogRef: MatDialogRef<BoatNewComponent>,
    private boatService: BoatService,
    @Inject(MAT_DIALOG_DATA) public data: Boat,
    private fb: FormBuilder) { }


  onSave() : void {

    this.boatService.postBoats({id: this.boatForm.get('id')?.value, name: this.boatForm.get('name')?.value, description: this.boatForm.get('description')?.value})
    .subscribe({
      next: (data) => this.dialogRef.close(data), 
      error: (err) => this.dialogRef.close()
    });
  }

}
