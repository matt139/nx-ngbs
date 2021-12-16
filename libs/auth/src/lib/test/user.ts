import * as Factory from 'factory.ts'
import * as faker from 'faker'
import { NgbsUser } from '../+state/auth.models'

export const userFactory = Factory.Sync.makeFactory<Partial<NgbsUser>>({
  displayName: Factory.each(() => faker.name.firstName()),
  emailVerified: true,
  photoURL: Factory.each(() => faker.image.dataUri()),
  isAnonymous: false,
})

export const testUser = userFactory.build()
