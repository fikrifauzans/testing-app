import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitorAddEditComponent } from '../visitor-add-edit/visitor-add-edit.component';
import { VisitorsService } from '../services/visitors.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'name', 'age', 'date_of_birth', 'address', 'keluhan', 'gender', 'section', 'antrean', 'status', 'action',];
  dataSource: MatTableDataSource<any>;
  params: string = 'waiting';
  onRoom: any = null;
  waitings: Array<any> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tabGroup') tabGroup: any;

  constructor(private _dialog: MatDialog, private _visitorService: VisitorsService,
    private router: Router
  ) { }



  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.tab.textLabel == 'Waiting') {
      this.params = ('waiting');
    } else if (tabChangeEvent.tab.textLabel == 'Cancel') {
      this.params = ('cancel');
    } else if (tabChangeEvent.tab.textLabel == 'Done') {
      this.params = ('done');
    } else {
      this.params = null
    }

    this.getVisitorList()
  }
  openAddEditVisitorForm() {
    const dialogRef = this._dialog.open(VisitorAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVisitorList()
        }

      },
      error: (err) => {
        this.getVisitorList()
      }
    })
  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.getVisitorList()
    this.getWaitingAndOnRoomVisitor()
  }


  getVisitorList() {
    this._visitorService.getVisitorList(this.params).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (error) => console.log(error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteVisitor(id: number) {
    this._visitorService.deleteVisitor(id)
      .subscribe({
        next: (res) => {
          alert('data deleted')
          this.getVisitorList()
        },
        error: (err) => {
          alert('data deleted')
          this.getVisitorList()
        }
      })
  }
  openEditVisitor(data: any) {
    const dialogRef = this._dialog.open(VisitorAddEditComponent, { data })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getVisitorList()
      },
      error: (err) => {
        this.getVisitorList()
      }
    })

  }

  goToFormPage() {
    this.router.navigate(['/input-visitor-details']);
  }

  getWaitingAndOnRoomVisitor() {
    this._visitorService.getVisitorList('waiting').subscribe({
      next: (res) => this.waitings = res,
      error: (err) => alert('error')
    })
    this._visitorService.getVisitorList('onroom').subscribe({
      next: (res) => this.onRoom = res[0],
      error: (err) => alert('error')
    })
  }

  nextAndNewQueue() {

    if (this.onRoom && this.onRoom.status == 'onroom') {

      this._visitorService.updateVisitor(this.onRoom._id, { status: 'done' })
        .subscribe({
          next: () => this.refresh(),
          error: () => this.refresh()
        })
    }
    this.getWaitingAndOnRoomVisitor()
    this._visitorService.updateVisitor(this.waitings[0]._id, { status: 'onroom' }).subscribe({
      next: () => this.refresh(),
      error: () => this.refresh()
    })


  }


  cancelQueue() {
    this._visitorService.updateVisitor(this.onRoom._id, { status: 'cancel' })
      .subscribe({
        next: () => this.refresh(),
        error: () => this.refresh()
      })
  }



}
