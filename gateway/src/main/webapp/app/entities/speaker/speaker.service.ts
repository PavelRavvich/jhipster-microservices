import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Speaker } from './speaker.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Speaker>;

@Injectable()
export class SpeakerService {

    private resourceUrl =  SERVER_API_URL + 'conference/api/speakers';

    constructor(private http: HttpClient) { }

    create(speaker: Speaker): Observable<EntityResponseType> {
        const copy = this.convert(speaker);
        return this.http.post<Speaker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(speaker: Speaker): Observable<EntityResponseType> {
        const copy = this.convert(speaker);
        return this.http.put<Speaker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Speaker>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Speaker[]>> {
        const options = createRequestOption(req);
        return this.http.get<Speaker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Speaker[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Speaker = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Speaker[]>): HttpResponse<Speaker[]> {
        const jsonResponse: Speaker[] = res.body;
        const body: Speaker[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Speaker.
     */
    private convertItemFromServer(speaker: Speaker): Speaker {
        const copy: Speaker = Object.assign({}, speaker);
        return copy;
    }

    /**
     * Convert a Speaker to a JSON which can be sent to the server.
     */
    private convert(speaker: Speaker): Speaker {
        const copy: Speaker = Object.assign({}, speaker);
        return copy;
    }
}
