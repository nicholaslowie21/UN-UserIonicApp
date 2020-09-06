import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestVerificationPage } from './request-verification.page';

describe('RequestVerificationPage', () => {
  let component: RequestVerificationPage;
  let fixture: ComponentFixture<RequestVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
