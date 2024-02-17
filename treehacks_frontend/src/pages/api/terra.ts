import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {  
  const {userID} = req.body

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'dev-id': process.env.NEXT_PUBLIC_TERRA_DEVELOPER_ID || '',
      'x-api-key': process.env.NEXT_PUBLIC_TERRA_API_KEY || '',
    }
  };
    
  const end_date = new Date().toISOString().split('T')[0]
  const start_date = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]

  const response = await fetch(`https://api.tryterra.co/v2/daily?user_id=${userID}&start_date=${start_date}&end_date=${end_date}&to_webhook=false&with_samples=false`, options)

  const data = await response.json()

  res.status(200).json(data)
}
