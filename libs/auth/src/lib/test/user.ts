import * as Factory from 'factory.ts'
import * as faker from 'faker'
import { NgbsUser } from '../+state/auth.models'

export const userFactory = Factory.Sync.makeFactory<Partial<NgbsUser>>({
  displayName: Factory.each(
    () => `${faker.name.firstName()} ${faker.name.lastName()}`
  ),
  emailVerified: true,
  photoURL: 'https://blog.matttelliott.com/assets/cat1.jpeg',
  isAnonymous: false,
})

export const testUser = userFactory.build()
