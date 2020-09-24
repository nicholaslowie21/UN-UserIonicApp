import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditResourcePage } from './edit-resource.page';

describe('EditResourcePage', () => {
  let component: EditResourcePage;
  let fixture: ComponentFixture<EditResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
