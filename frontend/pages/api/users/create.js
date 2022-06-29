import User from '../../../models/user';
import { dbConnect, dbDisconnect } from '../../../utilities/db';
import { hash, genSalt } from 'bcryptjs';

async function createUser(req, res) {
  if (req.method === 'POST') {
    // Deconstruct body
    const { name, email, password, companyCode, repStatus, userType } =
      req.body;

    // Check for all values
    if (
      name &&
      email &&
      password &&
      companyCode &&
      repStatus != null &&
      userType
    ) {
      // Connect to database
      await dbConnect();

      // Hash password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // Save User in the database
      User.findOneAndUpdate(
        { email }, // filter to look for
        {
          name,
          email,
          password: hashPassword,
          companyCode,
          repStatus,
          userType,
        },
        { new: true, upsert: true },
        (err, registeredUser) => {
          if (err) {
            console.log(err);
            // close database connection
            dbDisconnect();
            res.status(400).send({ error: 'Error saving to database.' });
          } else {
            // create payload then Generate an access token
            // let payload = {
            //   id: registeredUser._id,
            //   userType: userType,
            // };
            // const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            // res.status(200).send({ token });

            // close database connection
            dbDisconnect();
            res
              .status(201)
              .json({ message: 'User created', ...registeredUser });
          }
        }
      );
    } else {
      console.log('Registration Error');
      res.status(422).json({ message: 'Missing or Invalid Data' });
      return;
    }
  } else {
    // if not a POST route
    res.status(500).json({message: 'Invalid Route'})
  }
}

export default createUser;
