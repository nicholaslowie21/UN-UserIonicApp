import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AffiliationManagementPage } from './affiliation-management.page';

describe('AffiliationManagementPage', () => {
  let component: AffiliationManagementPage;
  let fixture: ComponentFixture<AffiliationManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliationManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AffiliationManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
