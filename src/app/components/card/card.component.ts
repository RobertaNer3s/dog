import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dog } from '../../models/Dog';
import { CommonModule } from '@angular/common';
import { ModalMoreInformationDogComponent } from '../modal/modal-more-information-dog/modal-more-information-dog.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ModalMoreInformationDogComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Output() onClick = new EventEmitter();
  @Input() dog: Dog | null = null;

  public handleModalMoreInformation(): void {
    this.onClick.emit({ modalIsVisible: true, selectedDog: this.dog });
  }
}
