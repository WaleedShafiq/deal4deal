import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {

	isShipping = new BehaviorSubject<boolean>(false);
	isShipping_asObs = this.isShipping.asObservable();

	isSuccess = new BehaviorSubject<boolean>(false);
	isSuccess_asObs = this.isSuccess.asObservable();

	isOrdered = new BehaviorSubject<boolean>(false);
	isOrdered_asObs = this.isOrdered.asObservable();


	EmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*_+)(-]{8,}$/;

	LocalStorageEnum = {
		Lang: "Lang"
	};

	Roles = [
		{ Id: 1, Name: 'Admin' },
		{ Id: 2, Name: 'User' },
		{ Id: 3, Name: 'Gust' }
	];

	IsShipping(statues : boolean){
	  console.log('statues', statues)
		this.isShipping.next(statues)

	}

	IsOrdered(statue: boolean) {
		this.isOrdered.next(statue);
	}

	IsSuccess(statues: boolean) {
		this.isSuccess.next(statues);
	}

}
