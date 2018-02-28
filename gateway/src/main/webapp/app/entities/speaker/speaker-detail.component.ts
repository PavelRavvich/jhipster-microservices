import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
    selector: 'jhi-speaker-detail',
    templateUrl: './speaker-detail.component.html'
})
export class SpeakerDetailComponent implements OnInit, OnDestroy {

    speaker: Speaker;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private speakerService: SpeakerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSpeakers();
    }

    load(id) {
        this.speakerService.find(id)
            .subscribe((speakerResponse: HttpResponse<Speaker>) => {
                this.speaker = speakerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'speakerListModification',
            (response) => this.load(this.speaker.id)
        );
    }
}
