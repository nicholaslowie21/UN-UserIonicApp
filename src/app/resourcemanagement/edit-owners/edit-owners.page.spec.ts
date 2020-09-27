import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOwnersPage } from './edit-owners.page';

describe('EditOwnersPage', () => {
  let component: EditOwnersPage;
  let fixture: ComponentFixture<EditOwnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOwnersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOwnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
