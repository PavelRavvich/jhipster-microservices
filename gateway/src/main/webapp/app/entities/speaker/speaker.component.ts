import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerService } from './speaker.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-speaker',
    templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
speakers: Speaker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private speakerService: SpeakerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.speakerService.query().subscribe(
            (res: HttpResponse<Speaker[]>) => {
                this.speakers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSpeakers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Speaker) {
        return item.id;
    }
    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe('speakerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
