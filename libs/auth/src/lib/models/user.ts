import { NgbsUser } from "../+state/auth.models"

export const anonymousUser: NgbsUser = {
  displayName: 'ANONYMOUS USER',
  emailAddress: 'anonymous@example.com',
  avatarUrl: 'http://via.placeholder.com/400',
}


export const testUser: NgbsUser = {
  displayName: 'TEST USER',
  emailAddress: 'test@example.com',
  avatarUrl: 'https://blog.matttelliott.com/assets/selfie.jpeg',
}
