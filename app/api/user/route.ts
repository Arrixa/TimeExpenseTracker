import { prisma } from "@/lib/prisma"; 
import { excludedDomains } from "@/lib/excludedDomains";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

type Email = string;

function extractEmailDomain(email: Email): string {
  const [user, domain] = email.toLowerCase().split('@');
  const domainParts = domain.split('.');
  // Check if the domain is not in the excluded list
  console.log(domainParts)
  if (!excludedDomains.includes(domainParts[0])) {
    return domainParts[0];
  } 
  const isolatedDomain = domainParts[0];
  console.log(isolatedDomain)
  return isolatedDomain;
}

const isDomainInExcludedList = (domain: string): boolean => {
  return excludedDomains.includes(domain);
}


export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { emailVerified, image, id, ...user } = reqBody;
    console.log(reqBody)

    // Check if user email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exists. Please signin"})
    }

      // New user
      const newUser = await prisma.user.create({
      data: {
        ...user,
      }
    });

    // Check if client domain exists
    const domain = extractEmailDomain(user.email);
    console.log("domain", domain)
    
    // Check if the domain is part of the excluded list (public domains)
    const isPublicDomain = isDomainInExcludedList(domain);
    console.log(isPublicDomain)

    if (!isPublicDomain) {
      let roles = [];
      let client;
  
      if (!isPublicDomain) {
        const existingClientByDomain = await prisma.client.findUnique({
          where: { 
            domain: domain 
          },
        });
  
        if (!existingClientByDomain) {
          client = await prisma.client.create({ 
            data: { 
              domain: domain 
            } 
          });
          roles.push(Role.ADMIN, Role.EMPLOYEE);
        } else {
          client = existingClientByDomain;
          roles.push(Role.EMPLOYEE);
        }
      }
  
      if (roles.length === 0) {
        // If roles are not assigned, assume some default role, e.g., USER
        roles.push(Role.UNASSIGNED);
      }
  
      console.log('Roles:', roles);
      console.log('Client:', client);
  
      // New record in ClientUser table
      const newClientUser = await prisma.clientUser.create({
        data: {
          client: { connect: { id: client.id } },
          user: { connect: { id: newUser.id } },
          role: roles,
        },
      });     
    }

    return NextResponse.json({ user: newUser, message: "User created successfully"}, { status: 201 })

  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}
