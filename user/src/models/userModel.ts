import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  organization: string
  name: string
  email: string
  role: string
  password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {
  findByEmailAndOrg(email: string, organization: string): UserDoc
  findByIdAndOrg(id: string, organization: string): UserDoc
}

const userSchema = new mongoose.Schema({
  organization: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
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

// tslint:disable-next-line: only-arrow-functions
userSchema.statics.findByEmailAndOrg = function (email: string, organization: string) {
  return this.findOne({ email, organization })
}

userSchema.statics.findByIdAndOrg = function (id: string, organization: string) {
  return this.findOne({ _id: id, organization })
}

const userModel = mongoose.model<UserDoc, UserModel>('User', userSchema)


export default userModel
