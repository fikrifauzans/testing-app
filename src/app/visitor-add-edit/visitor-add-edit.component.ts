import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VisitorsService } from '../services/visitors.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-visitor-add-edit',
  templateUrl: './visitor-add-edit.component.html',
  styleUrls: ['./visitor-add-edit.component.css']
})
export class VisitorAddEditComponent implements OnInit {

  hospitalSection: string[] = ['Doktor Umum']
  visitorForm: FormGroup;

  ngOnInit(): void {
    if (this.data != null) this.visitorForm.patchValue(this.data)
  }

  constructor(
    private _fb: FormBuilder,
    private _visitorService: VisitorsService,
    private _dialogRef: MatDialogRef<VisitorAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) {

    this.visitorForm = this._fb.group({
      name: '',
      age: '',
      date_of_birth: '',
      address: '',
      gender: '',
      section: '',
      keluhan: '',

    })
  }

  onFormSubmit() {
    if (this.visitorForm.valid) {
      if (this.data._id != undefined) this.updateVisitor(this.visitorForm.value)
      else {
        return this._visitorService.addVisitor(this.visitorForm.value)
          .subscribe({
            next: (res) => {
              alert('data success added')
              this._dialogRef.close(true)
            },
            error: (error) => {
              alert('data failed added')
              this._dialogRef.close(true)
            }
          })
      }
      
    }
  }
  updateVisitor(data: any) {
    return this._visitorService.updateVisitor(this.data._id, data).subscribe({
      next: (resp) => {
        alert('data updated')
        this._dialogRef.close()
      },
      error: (err) => {
        console.log(err);

      }
    })

  }





}
