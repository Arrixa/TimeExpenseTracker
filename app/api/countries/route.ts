// FTM-2 / FTM-20 17. Get country data

export async function GET() {
  const res = await fetch('https://countriesnow.space/api/v0.1/countries/info?returns=flag,unicodeFlag,dialCode,currency', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  
 
  return Response.json( data )
}