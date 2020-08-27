import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

	constructor(
		private storage: StorageService
	) { }

	Logout() {
		this.storage.removeToken();
		this.storage.removeCurrentUser();
	}

}
