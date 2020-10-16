import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeCardInstitutionPage } from './change-card-institution.page';

describe('ChangeCardInstitutionPage', () => {
  let component: ChangeCardInstitutionPage;
  let fixture: ComponentFixture<ChangeCardInstitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCardInstitutionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeCardInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
