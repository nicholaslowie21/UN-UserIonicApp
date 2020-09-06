import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstitutionRegisterPage } from './institution-register.page';

describe('InstitutionRegisterPage', () => {
  let component: InstitutionRegisterPage;
  let fixture: ComponentFixture<InstitutionRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
