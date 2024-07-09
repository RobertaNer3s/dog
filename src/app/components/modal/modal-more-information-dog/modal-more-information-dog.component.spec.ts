import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMoreInformationDogComponent } from '../../../../../src/app/components/modal/modal-more-information-dog/modal-more-information-dog.component';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

describe('ModalMoreInformationDogComponent', () => {
  let component: ModalMoreInformationDogComponent;
  let fixture: ComponentFixture<ModalMoreInformationDogComponent>;
  let dialogRef: MatDialogRef<ModalMoreInformationDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalMoreInformationDogComponent,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        CommonModule,
      ],
      providers: [
        HttpClient,
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            dog: {
              id: 1,
              name: 'teste',
              bred_for: 'teste',
              breed_group: 'teste',
              life_span: 'teste',
              temperament: 'teste',
              origin: 'teste',
              reference_image_id: 'teste',
              image: {
                id: 'teste',
                width: 1,
                height: 1,
                url: 'teste',
              },
            },
          },
        },
      ],
    }).compileComponents();

    dialogRef = TestBed.inject(MatDialogRef);
    fixture = TestBed.createComponent(ModalMoreInformationDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onClose is called', () => {
    // GIVEN
    spyOn(dialogRef, 'close');

    // WHEN
    component.onClose();

    // THEN
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should emit false when handleCloseModal is called', () => {
    // GIVEN
    spyOn(component.closeModal, 'emit');

    // WHEN
    component.handleCloseModal();

    // THEN
    expect(component.closeModal.emit).toHaveBeenCalledWith(false);
  });
});
