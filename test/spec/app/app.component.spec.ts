import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../../src/app/app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    // GIVEN
    const fixture = TestBed.createComponent(AppComponent);

    // WHEN
    const app = fixture.componentInstance;

    // THEN
    expect(app).toBeTruthy();
  });

  it(`should have the 'dogs' title`, () => {
    // GIVEN
    const fixture = TestBed.createComponent(AppComponent);

    // WHEN
    const app = fixture.componentInstance;

    // THEN
    expect(app.title).toEqual('dogs');
  });

  it('should render title', () => {
    // GIVEN
    const fixture = TestBed.createComponent(AppComponent);

    // WHEN
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // THEN
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, dogs');
  });
});
