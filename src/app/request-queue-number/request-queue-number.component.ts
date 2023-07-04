import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitorsService } from '../services/visitors.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css']
})
export class RequestQueueNumberComponent implements OnInit {
  visitor: any;
  
  constructor(
    private route: ActivatedRoute,
    private _visitorService: VisitorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    if (id) this.findByIdVisitor(id)

  }

  findByIdVisitor(id: number) {
    return this._visitorService.findById(id).subscribe({
      next: (res) => {
        let data = res
        this.visitor = data
      }, error: (err) => {
        console.log(err);

      }
    })

  }

  print(): void {
    let printContents: any, popupWin: any;
    printContents = document.getElementById('barcode-queue').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  backToList() {
    this.router.navigate(['visitor-list'])
  }

}
