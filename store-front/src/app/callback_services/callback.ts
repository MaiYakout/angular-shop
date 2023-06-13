import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class CallBack {
    loginChange = new EventEmitter<any>();
    languageChange = new EventEmitter<boolean>();
}