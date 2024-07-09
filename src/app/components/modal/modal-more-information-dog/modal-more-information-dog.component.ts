import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dog } from '../../../models/Dog';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-more-information-dog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    CommonModule
  ],
  templateUrl: './modal-more-information-dog.component.html',
  styleUrl: './modal-more-information-dog.component.scss',
})
export class ModalMoreInformationDogComponent {
  @Output() closeModal = new EventEmitter();
  @Input() dog: Dog | null = null;
  readonly dialogRef = inject(MatDialogRef<ModalMoreInformationDogComponent>);
  readonly data = inject<{dog: Dog}>(MAT_DIALOG_DATA);

  public onClose(): void {
    this.dialogRef.close();
  }

  public handleCloseModal(): void {
    this.closeModal.emit(false);
  }
}
