import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   res.status(400).json({ error: 'Invalid request method' });
  //   return;
  // }
  const { message } = req.body;
  // get user's wallet from the cookie
  // const wallet = req.cookies.wallet || '';
  const wallet = "0x6753bC5FC42dB5Ee20EeC55eE3F95D49fFaA8d87";
  const signedMsg = "0x8e857aa7b079d82af8de389e60d010fb0e642d6dd6bd62aab727784c3a96d24a0e5c27f2c9e73b9e64b1777d9649f6ba64b2cae2b7d661e61e5c3dbc58459c3a1b";
  const api_key = process.env.CROSSMINT_API_KEY || '';
  const options = {
    method: 'POST',
    headers: {'X-API-KEY': api_key, 'Content-Type': 'application/json'},
    body: `{"message":"${message}"}`
  };
  
  const response = await fetch(`https://staging.crossmint.com/api/v1-alpha1/wallets/arbitrum:${wallet}/signMessage`, options)
  const data = await response.json()

  if (!response.ok) {
    res.status(500).json({ error: 'Failed to sign message' });
    return;
  } 
  res.status(200).json(data);

}