import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechinspectPage } from './techinspect.page';

describe('TechinspectPage', () => {
  let component: TechinspectPage;
  let fixture: ComponentFixture<TechinspectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechinspectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TechinspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
