import User from "../../../models/User";
import dbConnect from "../../../lib/db";

export default async function(req, res) {
  const {query: {id}, method,} = req
  // console.log('users id', id);
  // console.log('users method', method);
  
  if (method === 'GET') {
    try {
      await dbConnect()
      const user = await User.findById(id, { password:false }).exec()
      // console.log('users user', user);
      
      if(!user) {
        res.status(400).json({message: 'No user found'})
        // resolve()
      } else {
        res.status(200).json({message: 'Success', user})
        // resolve()
      }

    } catch (error) {
      res.status(400).json({message: 'Error'})
      // resolve()
    }
  } else if (method === 'PUT') {
    console.log('put');
  } else if (method === 'DELETE') {
    console.log('delete');
    
  }
  // return new Promise ( async (resolve, reject) => {
  // })
}