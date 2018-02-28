/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { SpeakerComponent } from '../../../../../../main/webapp/app/entities/speaker/speaker.component';
import { SpeakerService } from '../../../../../../main/webapp/app/entities/speaker/speaker.service';
import { Speaker } from '../../../../../../main/webapp/app/entities/speaker/speaker.model';

describe('Component Tests', () => {

    describe('Speaker Management Component', () => {
        let comp: SpeakerComponent;
        let fixture: ComponentFixture<SpeakerComponent>;
        let service: SpeakerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpeakerComponent],
                providers: [
                    SpeakerService
                ]
            })
            .overrideTemplate(SpeakerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Speaker(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.speakers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
