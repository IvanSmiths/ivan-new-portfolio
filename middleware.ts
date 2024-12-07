import arcjet, {
  ArcjetDecision,
  ArcjetNext,
  detectBot,
  shield,
} from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
const aj: ArcjetNext<{}> = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
    }),
    shield({
      mode: "LIVE",
    }),
  ],
});

export default async function middleware(request: NextRequest) {
  const decision: ArcjetDecision = await aj.protect(request);

  if (decision.isDenied() && decision.reason.isBot()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  } else {
    return NextResponse.next();
  }
}
