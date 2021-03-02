import { Injectable } from "@angular/core";
import { LocalUser } from "../model/credenciais.model";

export const STORAGE_KEYS = {
  localUser: "localUser",
};

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr) {
      return JSON.parse(usr);
    }

    return null as any;
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }
}
