import { User } from '@angular/fire/auth'

export type NgbsPassword = string
export type NgbsEmailAddress = string

export interface NgbsAuthCredentials {
  emailAddress: NgbsEmailAddress
  password: NgbsPassword
}

export type NgbsUser = User

export type NgbsError = any
