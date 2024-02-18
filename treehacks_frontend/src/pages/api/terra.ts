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
  const healthData = assessHealthStatus(data)

  res.status(200).json(healthData)
}


function assessHealthStatus(userData : any) {
  // Define thresholds for categorization (these are example values and should be adjusted)
  const activityThresholds = { high: 10000, moderate: 5000 };
  const calorieIntakeLimits = { upper: 2500, lower: 1200 };
  const heartRateZones = { normal: [60, 100] };

  console.log("userdata steps", userData.data[0].distance_data.steps)
  console.log("userdata calories", userData.data[0].calories_data.net_intake_calories)
  console.log("userdata heart rate", userData.data[0].heart_rate_data.summary.avg_hr_bpm)
  
  // Assess activity level
  let activityScore = userData.data[0].distance_data.steps >= activityThresholds.high ? 2 : 
                        userData.data[0].distance_data.steps >= activityThresholds.moderate ? 1 : 0;

  // Assess nutritional intake
  let nutritionScore = userData.data[0].calories_data.net_intake_calories <= calorieIntakeLimits.upper && 
                        userData.data[0].calories_data.net_intake_calories >= calorieIntakeLimits.lower ? 1 : 0;

  // Assess heart rate
  let heartRateScore = userData.data[0].heart_rate_data.summary.avg_hr_bpm >= heartRateZones.normal[0] && 
                        userData.data[0].heart_rate_data.summary.avg_hr_bpm <= heartRateZones.normal[1] ? 1 : 0;

  // Calculate total score
  let totalScore = activityScore + nutritionScore + heartRateScore;

  let healthObj = {
    activityScore: activityScore,
    nutritionScore: nutritionScore,
    heartRateScore: heartRateScore,
    totalScore: totalScore
  }
  // Determine health status
  if (totalScore === 4) {
    return healthObj;
  } else if (totalScore >= 2) {
    return healthObj;
  } else {
    return healthObj;
  }
}