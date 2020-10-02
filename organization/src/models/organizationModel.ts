import mongoose from 'mongoose'

import { IOrganizationChannel, IOrganizationMember } from '../organizationTypes'

export interface OrganizationDoc extends mongoose.Document {
  name: string
  logo: string
  members: IOrganizationMember[]
  channels: IOrganizationChannel[]
}

export interface OrganizationModel extends mongoose.Model<OrganizationDoc> {
  findOrganizationByName(name: string): OrganizationDoc
}

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  logo: {
    type: String
  },
  members: [
    new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      },
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    })
  ],
  channels: [
    new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
      }
    })
  ]
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
    }
  }
})

organizationSchema.statics.findOrganizationByName = function (name: string) {
  return this.findOne({ name })
}

const organizationModel = mongoose.model<OrganizationDoc, OrganizationModel>('Organization', organizationSchema)

export default organizationModel