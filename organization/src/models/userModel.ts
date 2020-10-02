import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  name: string
  email: string
  role: string
}

export interface UserModel extends mongoose.Model<UserDoc> {

}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
    }
  }
})

const userModel = mongoose.model<UserDoc, UserModel>('User', userSchema)

export default userModel