import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassrecPage } from './passrec.page';

describe('PassrecPage', () => {
  let component: PassrecPage;
  let fixture: ComponentFixture<PassrecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassrecPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassrecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
