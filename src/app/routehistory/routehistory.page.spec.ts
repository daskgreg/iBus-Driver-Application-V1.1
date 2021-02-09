import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutehistoryPage } from './routehistory.page';

describe('RoutehistoryPage', () => {
  let component: RoutehistoryPage;
  let fixture: ComponentFixture<RoutehistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutehistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutehistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
