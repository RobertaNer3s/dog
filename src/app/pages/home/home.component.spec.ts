import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './home.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CardComponent } from '../../components/card/card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalMoreInformationDogComponent } from '../../components/modal/modal-more-information-dog/modal-more-information-dog.component';
import { Dog } from '../../models/Dog';
import { DogService } from '../../services/dog.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matDialog: MatDialog;
  let dogService: DogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CardComponent,
        MatPaginatorModule,
        SpinnerComponent,
        MatDialogModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: DogService,
          useValue: {
            getDogs: jasmine.createSpy().and.returnValue(
              of({
                body: [{ id: 1, name: 'Bulldog', image: 'bulldog.jpg' }],
                headers: {
                  get: () => '1',
                },
              })
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    matDialog = TestBed.inject(MatDialog);
    dogService = TestBed.inject(DogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should fetch dogs on ngOnInit', () => {
    // WHEN
    component.ngOnInit();

    // THEN
    expect(dogService.getDogs).toHaveBeenCalled();
  });

  it('should open modal with selected dog', () => {
    // GIVEN
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
    spyOn(matDialog, 'open').and.callThrough();

    // WHEN
    component.handleOpenModal({ selectedDog: dog });

    // THEN
    expect(matDialog.open).toHaveBeenCalledWith(
      ModalMoreInformationDogComponent,
      {
        data: { dog: dog },
      }
    );
  });

  it('should update page index and limit and fetch dogs', () => {
    // GIVEN
    const pageIndex = 1;
    const pageSize = 12;

    // WHEN
    component.onPageChange({ pageIndex, pageSize });

    // THEN
    expect(component.page).toBe(pageIndex);
    expect(component.limit).toBe(pageSize);
    expect(dogService.getDogs).toHaveBeenCalledWith(pageIndex, pageSize);
    expect(component.totalPages).toBe(1);
    expect(component.page).toBe(1);
  });
});
