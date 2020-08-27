import { Injectable } from '@angular/core';

export interface UserSession {
   userId: string;
   level: number;
}

enum StorageEnum {
    Token = 'token',
    CurrentUser = 'CurrentUser'
}

@Injectable()
export class StorageService {

    private setSessionStorage(key: any, obj: any) {
        sessionStorage.setItem(key, JSON.stringify(obj));
    }

    private getSessionStorage(key: any) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    setCurrentUser(currentUser: any) {
        this.setSessionStorage(StorageEnum.CurrentUser, currentUser);
    }

    getCurrentUser(): UserSession {
        return this.getSessionStorage(StorageEnum.CurrentUser);
    }

    removeCurrentUser(): any {
        return this.removeSessionStorage(StorageEnum.CurrentUser);
    }

    private setLocalStorage(key: any, obj: any) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    private getLocalStorage(key: any) {
        return localStorage.getItem(key);
    }

    private removeLocalStorage(key: any) {
        localStorage.removeItem(key);
    }
    private removeSessionStorage(key: any) {
        sessionStorage.removeItem(key);
    }

    setToken(token: any) {
        this.setSessionStorage(StorageEnum.Token, token);
    }

    getToken(): any {
        return this.getSessionStorage(StorageEnum.Token) || this.getLocalStorage(StorageEnum.Token);
    }

    removeToken(): any {
        return this.removeSessionStorage(StorageEnum.Token);
    }

}
