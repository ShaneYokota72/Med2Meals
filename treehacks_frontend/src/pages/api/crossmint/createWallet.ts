import { NextApiRequest, NextApiResponse } from "next";


export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    if( req.method !== 'POST' ) {
        const api_key = process.env.CROSSMINT_API_KEY || '';
        const options = {
            method: 'POST',
            headers: {'X-API-KEY': api_key, 'Content-Type': 'application/json'},
            body: '{"chain":"arbitrum","email":"shaneyok@usc.edu"}'
        };
    
        const response = await fetch('https://staging.crossmint.com/api/v1-alpha1/wallets', options)
        const data = await response.json()
    
        if( !response.ok ) {
            res.status(500).json({ error: 'Failed to create wallet' });
            return;
        }
        res.status(200).json(data);
    }
}