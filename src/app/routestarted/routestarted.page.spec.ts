import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutestartedPage } from './routestarted.page';

describe('RoutestartedPage', () => {
  let component: RoutestartedPage;
  let fixture: ComponentFixture<RoutestartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutestartedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutestartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
