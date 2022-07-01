import jwt from 'jsonwebtoken';


async function getUser(req, res) {
    const {cookies} = req;

    const tls = cookies.theLightSource;

    // console.log(tls);

    let verifiedUser = jwt.verify(tls, process.env.TOKEN_SECRET)
    console.log(verifiedUser);
    res.json({message: 'successful!'})
}

export default getUser;