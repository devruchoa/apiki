import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe(HeaderComponent.name, () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  afterEach(() => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
  });

  it(`should create the ${HeaderComponent.name} when created`, () => {
    expect(component).toBeTruthy();
  });

  it(`should display the logo image with the correct src when the ${HeaderComponent.name} is rendered`, () => {
    const logoImage: HTMLImageElement | null = compiled.querySelector('.header__logo');
    expect(logoImage).toBeTruthy();
    expect(logoImage?.src).toContain('https://blog.apiki.com/wp-content/uploads/sites/2/2020/04/marca-apiki-blog-h552-e1595420262681.png');
  });

  it(`should have alt attribute on logo image when the ${HeaderComponent.name} is rendered`, () => {
    const logoImage: HTMLImageElement | null = compiled.querySelector('.header__logo');

    expect(logoImage).toBeTruthy();
    expect(logoImage?.alt).toBeTruthy();
  })

  it(`should have left-aligned text when the screen is wider`, () => {
    const headerElement: HTMLElement | null = compiled.querySelector('.header');
    expect(getComputedStyle(headerElement as HTMLElement).textAlign).toBe('left');
  });

  it(`should have 128px padding-left when the screen is wider`, () => {
    const headerElement: HTMLElement | null = compiled.querySelector('.header');
    expect(getComputedStyle(headerElement as HTMLElement).paddingLeft).toBe('128px');
  });

  it(`should have center-aligned text when the screen is smaller`, () => {
    const headerElement = compiled.querySelector('.header');

    if (window.innerWidth < 770) {
      (headerElement as HTMLElement).style.textAlign = 'center';
    }

    expect(getComputedStyle(headerElement as HTMLElement).textAlign).toBe('center');
  });
});
