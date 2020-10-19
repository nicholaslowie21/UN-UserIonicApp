import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMoneyRequestPage } from './create-money-request.page';

describe('CreateMoneyRequestPage', () => {
  let component: CreateMoneyRequestPage;
  let fixture: ComponentFixture<CreateMoneyRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMoneyRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMoneyRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
