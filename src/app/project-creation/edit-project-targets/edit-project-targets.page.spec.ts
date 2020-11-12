import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProjectTargetsPage } from './edit-project-targets.page';

describe('EditProjectTargetsPage', () => {
  let component: EditProjectTargetsPage;
  let fixture: ComponentFixture<EditProjectTargetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectTargetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProjectTargetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
