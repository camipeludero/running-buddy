import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const spotify_redirect_uri = "http://localhost:3000/api/auth/callback";

  let spotify_client_id: string = "";
  if (process.env.SPOTIFY_CLIENT_ID) {
    spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
  } else {
    console.error(
      'Undefined Error: An environmental variable, "SPOTIFY_CLIENT_ID", has something wrong.'
    );
    return NextResponse.json({ error: "Missing client ID" }, { status: 500 });
  }

  let spotify_client_secret: string = "";
  if (process.env.SPOTIFY_CLIENT_SECRET) {
    spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  } else {
    console.error(
      'Undefined Error: An environmental variable, "SPOTIFY_CLIENT_SECRET", has something wrong.'
    );
    return NextResponse.json({ error: "Missing client secret" }, { status: 500 });
  }

  const params = new URLSearchParams({
    code: code,
    redirect_uri: spotify_redirect_uri,
    grant_type: "authorization_code",
  });

  try {
    const response = await axios.post<SpotifyAuthApiResponse>(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              spotify_client_id + ":" + spotify_client_secret
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.access_token) {
      const cookieStore = cookies();
      cookieStore.set("spotify-token", response.data.access_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: response.data.expires_in,
      });
      
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.json({ error: "No access token received" }, { status: 400 });
  } catch (error) {
    console.error(`Error: ${error}`);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}