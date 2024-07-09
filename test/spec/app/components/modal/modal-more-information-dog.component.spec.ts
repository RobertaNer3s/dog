import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalMoreInformationDogComponent } from '../../../../../src/app/components/modal/modal-more-information-dog/modal-more-information-dog.component';

describe('ModalMoreInformationDogComponent', () => {
  let component: ModalMoreInformationDogComponent;
  let fixture: ComponentFixture<ModalMoreInformationDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMoreInformationDogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMoreInformationDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
