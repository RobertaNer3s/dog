import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DogService } from './dog.service';
import { Dog } from '../models/Dog';


describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService],
    });

    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    // THEN
    expect(service).toBeTruthy();
  });

  it('should retrieve dogs from the API via GET', () => {
    // GIVEN
    const dummyDogs: Dog[] = [
      {
        weight: { imperial: '20 - 30', metric: '9 - 14' },
        height: { imperial: '9 - 11.5', metric: '23 - 29' },
        id: 1,
        name: 'Affenpinscher',
        bred_for: 'Small rodent hunting, lapdog',
        breed_group: 'Toy',
        life_span: '10 - 12 years',
        temperament:
          'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
        origin: 'Germany, France',
        reference_image_id: 'BJa4kxc4X',
        image: {
          id: 'BJa4kxc4X',
          width: 1600,
          height: 1199,
          url: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
        },
      },
      {
        weight: { imperial: '50 - 60', metric: '23 - 27' },
        height: { imperial: '23 - 26', metric: '58 - 66' },
        id: 2,
        name: 'Afghan Hound',
        bred_for: 'Coursing and hunting',
        breed_group: 'Hound',
        life_span: '10 - 13 years',
        temperament: 'Aloof, Clownish, Dignified, Independent, Happy',
        origin: 'Afghanistan, Iran, Pakistan',
        reference_image_id: 'hMyT4CDXR',
        image: {
          id: 'hMyT4CDXR',
          width: 1200,
          height: 800,
          url: 'https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg',
        },
      },
    ];

    // WHEN
    service.getDogs(0, 10).subscribe(response => {
      expect(response.body).toEqual(dummyDogs);
    });

    // THEN
    const request = httpMock.expectOne(`${service['resourceUrl']}/breeds/?page=0&limit=10`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDogs);
  });
});
