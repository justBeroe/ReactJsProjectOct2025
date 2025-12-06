import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";

import { Song } from "../../models/song.model";
import { Song2 } from "../../models/song2.model";
//import { Theme } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class SongService {
    // private apiUrl = 'http://localhost:3000/api/themes';
    private fetchDeezerUrl = 'http://localhost:4000/api/fetch-deezer';
    private fetchJamendoUrl = 'http://localhost:4000/api/fetch-jamendo';
    private apiUrl = 'http://localhost:4000/api/songs';
    private apiUrl2 = 'http://localhost:4000/api/songs2';

    // themes$: Observable<Song[]>;


    constructor(private httpClient: HttpClient) { }

    // getThemes(): Observable<Song[]> {
    //     return this.httpClient.get<Song[]>(this.apiUrl);
    // }

    getSongs(): Observable<Song[]> {
        return this.httpClient.get(this.fetchDeezerUrl).pipe(
            switchMap(() => this.httpClient.get<Song[]>(this.apiUrl))
        );

        // First fetch fresh data from Deezer.
        // Then get all songs from MongoDB.
    }


    getSongsWithID(artistId: number): Observable<Song[]> {
        // Make request to fetch songs from given artistId, then get songs from MongoDB
        return this.httpClient
            .get(`${this.fetchDeezerUrl}?artistId=${artistId}`)
            .pipe(
                switchMap(() => this.httpClient.get<Song[]>(`${this.apiUrl}?artistId=${artistId}`))
            );
    }

    getSongsWithIDMongoDB(artistId: number): Observable<Song[]> {
        // Only fetch from MongoDB API
        return this.httpClient.get<Song[]>(`${this.apiUrl}?artistId=${artistId}`);
    }

    getSongsWithID2(artistId: number): Observable<Song2[]> {
        // Make request to fetch songs from given artistId, then get songs from MongoDB
        return this.httpClient.get(`${this.fetchJamendoUrl}?artistId=${artistId}`).pipe(
            switchMap(() => this.httpClient.get<Song2[]>(`${this.apiUrl2}?artistId=${artistId}`)));

        //Fetch only from MongoDB test

        //  return this.httpClient.get<Song2[]>(`${this.apiUrl2}?artistId=${artistId}`);

    }

    updateSong(songId: number, updatedData: any): Observable<any> {
        return this.httpClient.put(`${this.apiUrl}/${songId}`, updatedData);
    }

    deleteSong(songId: number): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/${songId}`);
    }

    //

    createSong(title: string, id: number): Observable<Song> {
        return this.httpClient.post<Song>(`${this.apiUrl}/themes`, { title, id }, {
            withCredentials: true,
        });
    }
}
