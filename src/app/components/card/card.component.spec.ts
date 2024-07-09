import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Dog } from '../../models/Dog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ModalMoreInformationDogComponent } from '../modal/modal-more-information-dog/modal-more-information-dog.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardComponent,
        MatCardModule,
        MatButtonModule,
        CommonModule,
        ModalMoreInformationDogComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should emit onClick event with correct data when handleModalMoreInformation is called', () => {
    // GIVEN
    spyOn(component.onClick, 'emit');
    const dog: Dog = {
      weight: {
        imperial: 'teste',
        metric: 'teste',
      },
      height: {
        imperial: 'teste',
        metric: 'teste',
      },
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
    };

    // WHEN
    component.dog = dog;
    component.handleModalMoreInformation();

    // THEN
    expect(component.onClick.emit).toHaveBeenCalledWith({
      modalIsVisible: true,
      selectedDog: dog,
    });
  });
});
