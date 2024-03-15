import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const session = await getServerSession(authOptions);
    const clientId = session?.clientUser?.clientId
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    if (!client) {
      return NextResponse.json({ message: "Client does not exist" }, { status: 404 });
    } 

    const updateClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        ...reqBody
      },
    });
    return NextResponse.json({ updateClient, message: "User created successfully"}, { status: 202 })
  } catch (error) {
    console.error("Error during updating client information:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const clientData = await getClientData(request);

    // Respond with the client data
    return Response.json(clientData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getClientData(request: Request) {
  const session = await getServerSession(authOptions);
  const clientId = session?.clientUser.clientId
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });


  if (!client) {
    return { message: "Client does not exist" };
  }

  // Extract and return the relevant data
  return {
    id: client?.id,
    domain: client?.domain,
    companyName: client?.companyName,
    website: client?.website,
    description: client?.description,
    countryCode: client?.countryCode,
    phoneNumber: client?.phoneNumber,
    streetNo: client?.streetNo,
    streetAddress: client?.streetAddress,
    province: client?.province,
    zipCode: client?.zipCode,
    country: client?.country,
    logo: client.logo,
  };
}