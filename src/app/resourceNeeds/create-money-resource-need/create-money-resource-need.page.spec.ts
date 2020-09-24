import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMoneyResourceNeedPage } from './create-money-resource-need.page';

describe('CreateMoneyResourceNeedPage', () => {
  let component: CreateMoneyResourceNeedPage;
  let fixture: ComponentFixture<CreateMoneyResourceNeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMoneyResourceNeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMoneyResourceNeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
