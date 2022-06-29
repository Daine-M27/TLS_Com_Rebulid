import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
// import { MongoClient } from 'mongodb';
import { dbConnect, dbDisconnect } from '../../../utilities/db';
import { compare } from 'bcryptjs';

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },
    //Specify Provider
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                //Connect to DB
                const client = dbConnect;
                //Get all the users
                const users = await client.db().collection('users');
                //Find user with the email  
                const result = await users.findOne({
                    email: credentials.email,
                });
                //Not found - send error res
                if (!result) {
                    client.close();
                    throw new Error('No user found with the email');
                }
                //Check hashed password with DB password
                const checkPassword = await compare(credentials.passowrd, result.passowrd);
                //Incorrect password - send response
                if (!checkPassword) {
                    client.close();
                    throw new Error('Password doesnt match');
                }
                //Else send success response
                client.close();
                return { email: result.email };
            },
        }),
    ],
});