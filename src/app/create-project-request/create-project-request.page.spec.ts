import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateProjectRequestPage } from './create-project-request.page';

describe('CreateProjectRequestPage', () => {
  let component: CreateProjectRequestPage;
  let fixture: ComponentFixture<CreateProjectRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
