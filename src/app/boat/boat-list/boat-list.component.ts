import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BoatEditComponent } from '../boat-edit/boat-edit.component';
import { BoatNewComponent } from '../boat-new/boat-new.component';
import { Boat } from '../model/boat.model';
import { BoatService } from '../service/boat.service';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.scss']
})
export class BoatListComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'description'];
  
  dataSource: MatTableDataSource<Boat> = new MatTableDataSource();

  paginationSubscription: Subscription | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private boatService: BoatService, private matDialog: MatDialog) {}

  ngAfterViewInit() {
    this.paginationSubscription = this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => this.boatService!.getBoats(this.paginator.pageIndex, this.paginator.pageSize)),
        tap(boatPaged => this.paginator.length = boatPaged.totalElements),
        tap(boatPaged => this.dataSource = new MatTableDataSource(boatPaged.content)),
      )
      .subscribe();  

  }

  ngOnDestroy(): void {
    this.paginationSubscription?.unsubscribe();
  }

  editBoat(boat: Boat) {
    const dialogRef = this.matDialog.open(BoatEditComponent, {
      width: '20em',
      data: boat,
    });

    // on edit 
    dialogRef.afterClosed()
    .pipe(
      filter(data =>  data)
    )
      .subscribe((boatUpdated) => {
        const boatsUpated = this.dataSource.data.map<Boat>(boatEl => {
          if (boatEl.id === boat.id) {
            return  boatUpdated;
          }
          return boatEl;
        });
      this.dataSource = new MatTableDataSource(boatsUpated);
    });
  }

  addBoat() {
    const dialogRef = this.matDialog.open(BoatNewComponent, {width: '20em'});

    // on edit 
    dialogRef.afterClosed()
    .pipe(
      filter(data =>  data)
    )
      .subscribe((boatCreated) => {
        this.dataSource.data.push(boatCreated)
        this.dataSource = new MatTableDataSource(this.dataSource.data);
    });
  }

  removeData() {
    
  }

}