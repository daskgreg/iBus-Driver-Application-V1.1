import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestApiPage } from './test-api.page';

describe('TestApiPage', () => {
  let component: TestApiPage;
  let fixture: ComponentFixture<TestApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestApiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
