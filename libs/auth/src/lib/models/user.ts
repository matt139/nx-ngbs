import { UserCredential, UserInfo } from '@angular/fire/auth'
import { pick } from 'ramda'
import { map } from 'rxjs'

/*
 * Let the backend (ie firebase) define its own model and create a function to return only the properties we need
 * Let our interface be defined as the return value of this function
 */
export function getUserFromResponse(response: UserCredential) {
  return getUserProperties(response.user)
}

export function getUserProperties(user: UserInfo) {
  return pick(['email', 'photoURL', 'displayName'], user)
}

export type NgbsUser = ReturnType<typeof getUserProperties>

export const mapResponseToUser = () => map(getUserFromResponse)
