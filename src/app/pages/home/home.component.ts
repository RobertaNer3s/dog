import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/Dog';
import { CardComponent } from '../../components/card/card.component';
import { ModalMoreInformationDogComponent } from '../../components/modal/modal-more-information-dog/modal-more-information-dog.component';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatPaginatorModule,
    SpinnerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public dogs: Dog[] = [];
  public isLoading = false;
  public totalPages: number = 0;
  public page: number = 0;
  public limit: number = 12;
  readonly dialog = inject(MatDialog);

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.handleGetDogs();
  }

  public handleOpenModal({ selectedDog }: { selectedDog: Dog }): void {
    this.dialog.open(ModalMoreInformationDogComponent, {
      data: { dog: selectedDog },
    });
  }

  public onPageChange({ pageIndex, pageSize }: {
    length?: number;
    pageIndex?: number;
    pageSize?: number;
    previousPageIndex?: number;
  }): void {
    pageIndex && (this.page = pageIndex);
    pageSize && (this.limit = pageSize);
    this.handleGetDogs(pageIndex);
  }

  private handleGetDogs(page = 0, limit = 12): void {
    this.isLoading = true;
    this.dogService.getDogs(page, limit).subscribe({
      next: (response) => {
        response.body && (this.dogs = response.body);
        this.totalPages = Number(response.headers.get('Pagination-Count'));
        this.page = Number(response.headers.get('Pagination-Page'));
      },
      error: (error) => {
        console.error('Error fetching dogs:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
