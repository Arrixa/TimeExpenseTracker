import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const response = await fetch("https://countriesnow.space/api/v0.1/countries/codes");
//     const data = await response.json();
//     console.log(data)

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error fetching country data:", error);
//     res.status(500).json({ error: true, msg: "Error fetching country data" });
//   }
// }

export async function GET() {
  const res = await fetch('https://countriesnow.space/api/v0.1/countries/info?returns=flag,unicodeFlag,dialCode', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  
 
  return Response.json( data )
}