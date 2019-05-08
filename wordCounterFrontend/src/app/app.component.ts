import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './api/data.service';

export interface PeriodicElement {
  word: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stringFormControl: FormControl;

// tslint:disable-next-line: max-line-length
  userData: PeriodicElement[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['word', 'count'];

  dataSource = new MatTableDataSource<PeriodicElement>(this.userData);

  constructor(private dataService: DataService) {
    // Assign the data to the data source for the table to render

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.dataService.getData().subscribe(
      res => {
        this.userData.length = 0;
        this.userData = res;
        this.dataSource = new MatTableDataSource<PeriodicElement>(
          this.userData
        );
      },
      err => {
        console.log(err, 'Error From API');
      }
    );
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
    this.stringFormControl = new FormControl('', [Validators.required]);
  }

  onkeydown(event) {
    if (this.stringFormControl.valid && event.keyCode === 13) {
        this.dataService
          .sendData({ data: this.stringFormControl.value })
          .subscribe(
            res => {
              this.userData.length = 0;
              this.userData = res;
              this.dataSource = new MatTableDataSource<PeriodicElement>(
                this.userData
              );
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
              }, 100);
            },
            err => {
              console.log(err, 'Error From API');
            }
          );
          this.stringFormControl.reset();
      /*  else if (event.keyCode === 13 && this.count === 1) {
        this.stringFormControl.reset();
        this.count = 0;
      } */
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
