import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public dogs: any = [];
  public isLoading = false;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.handleGetDogs();
  }

  private handleGetDogs() {
    console.log('caiu aqui');
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
