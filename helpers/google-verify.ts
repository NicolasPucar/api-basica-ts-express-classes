



const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function GoogleVerify(token: string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID  
  });
  const {name, email} = ticket.getPayload();
 


  return {
        nombre: name,
        email,
       
  }
}
