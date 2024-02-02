import { NextResponse } from "next/server";
import { userData } from "@/app/utils/data";

export function GET(req, {params}){
    const {userId} = params
  console.log(userId, "userId");
  const user = userData.find((user) => user.id === Number(userId));
  return NextResponse.json(user)   
}