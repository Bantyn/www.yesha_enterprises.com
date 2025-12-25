import { type NextRequest, NextResponse } from "next/server"

// POST - Admin login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Check against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json({ error: "Admin password not configured" }, { status: 500 })
    }

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true })

      // Set HTTP-only cookie for authentication
      response.cookies.set("admin_authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

// DELETE - Admin logout
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin_authenticated")
  return response
}
