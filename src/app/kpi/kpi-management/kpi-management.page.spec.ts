import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KpiManagementPage } from './kpi-management.page';

describe('KpiManagementPage', () => {
  let component: KpiManagementPage;
  let fixture: ComponentFixture<KpiManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KpiManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
