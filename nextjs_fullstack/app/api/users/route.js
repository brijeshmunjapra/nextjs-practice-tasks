import { NextResponse } from "next/server";
import { userData } from "@/app/utils/data";



export function GET(req){
  return NextResponse.json(userData)   
}

export async function POST(req){
  const data = await req.json();
  console.log(data, "payload")
  return NextResponse.json({message : "Success"})
}