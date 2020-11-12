import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTargetsPage } from './edit-targets.page';

describe('EditTargetsPage', () => {
  let component: EditTargetsPage;
  let fixture: ComponentFixture<EditTargetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTargetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTargetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
