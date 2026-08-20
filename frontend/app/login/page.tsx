"use client";

import { useRouter } from "next/navigation";
import { Pyramid } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const handleGuestLogin = () => {
    document.cookie = "guest-session=true; path=/";
    router.push("/tasks");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
    >
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="flex w-full max-w-[1280px] flex-col items-center">
          {/* Logo */}
          <div className="mb-5 flex items-center gap-1.5">
            <div className="flex size-5 items-center justify-center rounded-[5px] bg-[#171717]">
              <Pyramid className="size-3 text-white" />
            </div>

            <span className="text-xs font-medium text-[#171717]">
              Pyramid
            </span>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-[288px] rounded-2xl border border-[#E5E5E5] bg-white px-4 py-4 shadow-sm">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-[15px] font-semibold text-[#171717]">
                Let's get back on track
              </h1>

              <p className="mt-1 text-[10px] leading-4 text-[#8A8A8A]">
                Enter your email below to login to your account.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 space-y-2">
              {/* Guest */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="flex h-7 w-full items-center justify-center rounded-full bg-[#171717] text-[10px] font-medium text-white transition hover:bg-[#2A2A2A]"
              >
                Continue as Guest
              </button>

              {/* Google */}
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const response = await fetch(
                      `${API_URL}/api/auth/google`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                          credential: credentialResponse.credential,
                        }),
                      },
                    );

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(
                        data.message || "Google login failed",
                      );
                    }

                    router.push("/tasks");
                  } catch (error) {
                    console.error("Google login error:", error);
                    alert("Google login failed");
                  }
                }}
                onError={() => {
                  alert("Google login failed");
                }}
                theme="outline"
                shape="pill"
                size="large"
                text="signin_with"
                width="256"
              />
            </div>
          </div>

          {/* Terms */}
          <p className="mt-4 max-w-[190px] text-center text-[8px] leading-3 text-[#8A8A8A]">
            By clicking continue, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-[#171717]"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-[#171717]"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </main>
    </GoogleOAuthProvider>
  );
}