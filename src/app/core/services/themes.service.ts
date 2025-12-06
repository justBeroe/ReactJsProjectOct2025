import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Theme } from "../../models";
//import { Theme } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class ThemesService {
    // private apiUrl = 'http://localhost:3000/api/themes';
    private apiUrl = 'http://localhost:4000/api/songs';

    constructor(private httpClient: HttpClient) { }

    getThemes(): Observable<Theme[]> {
        return this.httpClient.get<Theme[]>(this.apiUrl);
    }

       createTheme(themeName: string, postText: string): Observable<Theme> {
        return this.httpClient.post<Theme>(`${this.apiUrl}/themes`, { themeName, postText }, {
            withCredentials: true,
        });
    }
}
