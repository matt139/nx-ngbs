import { UserCredential } from '@angular/fire/auth'
import { pick } from 'ramda'
import { map } from 'rxjs'

/*
 * Let the backend define its own model and create a function to return only the properties we need
 * Let our interface be defined as the return value of this function
 */
export function getUserFromResponse(response: UserCredential) {
  return pick(['email', 'photoURL', 'displayName'], response.user)
}

export type NgbsUser = ReturnType<typeof getUserFromResponse>

export const mapResponseToUser = () => map(getUserFromResponse)
