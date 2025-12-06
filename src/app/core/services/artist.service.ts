import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artist } from "../../models/artist.model";

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

      private apiDeezerUrl = 'http://localhost:4000/api/deezer-artists';
      private apiJamenUrl = 'http://localhost:4000/api/jamen-artists';
   

    constructor(private http: HttpClient) { }

    getDeezerArtists(): Observable<Artist[]> {
        return this.http.get<Artist[]>(this.apiDeezerUrl);
    }

    getJamenArtists(): Observable<Artist[]> {
        return this.http.get<Artist[]>(this.apiJamenUrl);
    }

}