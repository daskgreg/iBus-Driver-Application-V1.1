import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoutelistPage } from './routelist.page';

describe('RoutelistPage', () => {
  let component: RoutelistPage;
  let fixture: ComponentFixture<RoutelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
