import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boat } from '../model/boat.model';
import { BoatService } from '../service/boat.service';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.scss']
})
export class BoatEditComponent implements OnInit {

  boatForm = this.fb.group({
    id: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
  })

  constructor(public dialogRef: MatDialogRef<BoatEditComponent>,
    private boatService: BoatService,
    @Inject(MAT_DIALOG_DATA) public data: Boat,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.boatForm.get('id')?.setValue(this.data.id);
    this.boatForm.get('name')?.setValue(this.data.name);
    this.boatForm.get('description')?.setValue(this.data.description);
  }

  onSave() : void {

    this.boatService.putBoats({id: this.boatForm.get('id')?.value, name: this.boatForm.get('name')?.value, description: this.boatForm.get('description')?.value})
    .subscribe({
      next: (data) => this.dialogRef.close(data), 
      error: (err) => this.dialogRef.close()
    });
  }

  onDelete() : void {
    this.boatService.deleteBoats(this.boatForm.get('id')?.value)
    .subscribe({
      next: (data) => this.dialogRef.close({}), 
      error: (err) => this.dialogRef.close()
    });
  }

}
