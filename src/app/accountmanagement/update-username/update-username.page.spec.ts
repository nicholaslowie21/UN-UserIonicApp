import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateUsernamePage } from './update-username.page';

describe('UpdateUsernamePage', () => {
  let component: UpdateUsernamePage;
  let fixture: ComponentFixture<UpdateUsernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsernamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
