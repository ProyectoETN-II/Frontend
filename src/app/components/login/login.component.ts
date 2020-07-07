import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['login.style.less'],
	providers: [UserService]
}) 
export class LoginComponent{
	public title:string;
	public user: User;
	public status: string;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'login';
	}


}