import { Injectable, signal } from "@angular/core";
import { User } from "../../models";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:5000';

    private _isLoggedIn = signal<boolean>(false);
    //naming convention used to indicate that the property is 
    // intended to be private or used internally within a class, module, or file. 

    private _currentUser = signal<User | null>(null);
    private _users: User[] = []

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();


    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true)
        }
    }


    // login(email: string, password: string): boolean {

    //     if (email && password) {
    //         const user = this._users[0];
    //         this._currentUser.set(user);
    //         this._isLoggedIn.set(true)

    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.http.post(`${this.apiUrl}/loginin`, { email, password });
    //         return true;
    //     }

    //     return false;
    // }

    login(email: string, password: string): Observable<boolean> {
        if (!email || !password) {
            return of(false); // immediately return false wrapped in observable
        }

        return this.http.post<User>(`${this.apiUrl}/loginin`, { email, password }).pipe(
            //user: any was fixed with generic type added ---> http.post<User>

            map((user: User) => {
                // Assuming login successful, set current user etc.
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }),
            catchError(err => {
                console.error('Login failed', err);
                return of(false);
            })
        );
    }


    register(username: string, email: string, password: string, rePassword: string
    ): boolean {

        if (username && email && password && rePassword) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                username: username,
                email: email
            }

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true)

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }

        return false;

    }


    registerInMongo(username: string, email: string, password: string, rePassword: string) {
        return this.http.post(`${this.apiUrl}/registerin`, {
            username,
            email,
            password,
            rePassword
        });
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    // getCurrentUserId(): string | null {

    //     return this._currentUser()?.id || null;

    // }

    ///

    /** ✅ GET all users */
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            // Optionally map _id to id for Angular usage
            map(users =>
                users.map(user => ({
                    ...user,
                    id: user._id
                }))
            )
        );
    }

    /** ✅ Get a single user by ID */
    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}`);
    }



    updateUser(user: User): Observable<User> {
        if (!user.id) {
            throw new Error('User ID is required for update');
        }

        // Prepare payload without the 'id' property
        const payload = {
            username: user.username,
            email: user.email
        };

        return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, payload).pipe(
            tap(updatedUser => {
                // ✅ Update the signal so your template reflects the change
                this._currentUser.set(updatedUser);
            })
        );
    }




}