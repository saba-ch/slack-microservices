import organizationModel from './models/organizationModel'
import userModel from './models/userModel'

import { JWTPayload } from './services/jwtService'

import {
  CreateOrganizationInput,
  InviteUserToOrganizationInput,
  IOrganization
} from './organizationTypes'

const organization = async (organizationName: string): Promise<IOrganization> => {
  const foundOrganization = await organizationModel.findOrganizationByName(organizationName)
  if (!foundOrganization) throw new Error('organization not found')
  return foundOrganization
}

const createOrganization = async (createOrganizationInput: CreateOrganizationInput, user: JWTPayload): Promise<IOrganization> => {
  const fullUser = await userModel.findById(user.id)
  if (!fullUser) throw new Error('User doesn\'t exist')

  const foundOrganization = await organizationModel.findOrganizationByName(createOrganizationInput.name)
  if (foundOrganization) throw new Error('Organization already exists')

  const createdOrganization = new organizationModel({
    name: createOrganizationInput.name,
    members: [
      { name: fullUser.name, role: 'ADMIN', member: fullUser }
    ]
  })
  await createdOrganization.save()

  return createdOrganization
}

const inviteUserToOrganization = async (inviteUserObj: InviteUserToOrganizationInput, currentUser: JWTPayload): Promise<IOrganization> => {
  const foundOrganization = await organizationModel.findByIdAndUpdate(currentUser.organization, {
    $push: {
      members: {
        name: inviteUserObj.name,
        role: 'PENDING',
      }
    }
  }, { new: true })
  // Todo: send email

  return foundOrganization!
}

const leaveOrganization = async (currentUser: JWTPayload): Promise<boolean> => {
  const foundOrganization = await organizationModel.findById(currentUser.organization)

  const isAllowed = foundOrganization!.members.filter(member => member.role === 'ADMIN')
  if (!isAllowed) throw new Error('You can not leave the organization until you are the only admin')

  const leftMembers = foundOrganization!.members.filter(member => member.member !== currentUser.id)
  foundOrganization!.set('members', leftMembers)

  await foundOrganization!.save()

  return true
}


export default {
  organization,
  createOrganization,
  inviteUserToOrganization,
  leaveOrganization
}