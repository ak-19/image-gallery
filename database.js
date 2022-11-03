import mongoose from 'mongoose';
export const connectDatabase  = async () => mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })