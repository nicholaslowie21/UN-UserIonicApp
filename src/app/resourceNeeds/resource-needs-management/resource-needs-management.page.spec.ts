import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResourceNeedsManagementPage } from './resource-needs-management.page';

describe('ResourceNeedsManagementPage', () => {
  let component: ResourceNeedsManagementPage;
  let fixture: ComponentFixture<ResourceNeedsManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceNeedsManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceNeedsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
