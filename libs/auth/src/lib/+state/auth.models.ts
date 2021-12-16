export type NgbsPassword = string
export type NgbsEmailAddress = string

export interface NgbsAuthCredentials {
  emailAddress: NgbsEmailAddress
  password: NgbsPassword
}

export interface NgbsUser {
  readonly emailAddress: NgbsEmailAddress
  readonly displayName?: string | null
  readonly avatarUrl?: string | null
}
