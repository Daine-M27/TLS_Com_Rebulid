import mongoose from 'mongoose';

const dbConnect = async () => mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

const dbDisconnect = mongoose.close()

export { dbConnect, dbDisconnect };