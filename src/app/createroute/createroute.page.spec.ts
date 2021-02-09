import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateroutePage } from './createroute.page';

describe('CreateroutePage', () => {
  let component: CreateroutePage;
  let fixture: ComponentFixture<CreateroutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateroutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateroutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
