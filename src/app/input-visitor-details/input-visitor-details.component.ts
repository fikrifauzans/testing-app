import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VisitorsService } from '../services/visitors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css']
})
export class InputVisitorDetailsComponent implements OnInit {
  hospitalSection: string[] = ['Doktor Umum']
  visitorForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _visitorService: VisitorsService,
    private router: Router

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

  ngOnInit(): void {

  }

  backToVisitorList() {
    this.router.navigate(['visitor-list'])
  }
  onFormSubmit() {
    return this._visitorService.addVisitor(this.visitorForm.value)
      .subscribe({
        next: (res) => {
          alert('data success added')
          const id = res._id
          this.router.navigate(['request-queue-number' , id])

        },
        error: (error) => {
          alert('data failed added')

        }
      })
  }

}
