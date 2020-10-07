import mongoose from 'mongoose'

import { IChannelMember } from '../channelTypes'

export interface ChannelDoc extends mongoose.Document {
  organization: string
  members: IChannelMember[]
  description: string
  name: string
  creator: string
}

export interface ChannelModel extends mongoose.Model<ChannelDoc> {

}


const channelSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  members: [
    new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true
      },
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    })
  ],
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
    }
  }
})

const channelModel = mongoose.model<ChannelDoc, ChannelModel>('Channel', channelSchema)

export default channelModel