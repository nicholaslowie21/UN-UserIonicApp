import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateResourcePage } from './create-resource.page';

describe('CreateResourcePage', () => {
  let component: CreateResourcePage;
  let fixture: ComponentFixture<CreateResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
