import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/Dog';
import { CardComponent } from '../../components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalMoreInformationDogComponent } from '../../components/modal/modal-more-information-dog/modal-more-information-dog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public dogs: Dog[] = [];
  public isLoading = false;
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

  private handleGetDogs(): void {
    this.isLoading = true;
    this.dogService.getDogs().subscribe({
      next: (data) => {
        this.dogs = data;
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
