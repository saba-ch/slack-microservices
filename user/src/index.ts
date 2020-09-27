import mongoose from 'mongoose'
import app from './app'

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI not provided')
  if (!process.env.JWT_KEY) throw new Error('MONGO_URI not provided')

  app.listen(3000, () => console.info('Listening on port 3000'))

  await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.info('Connected to mongo')
}

start()