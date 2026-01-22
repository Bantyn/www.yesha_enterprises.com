import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { initializeServices } from '@/lib/db-utils';

export async function GET(request: NextRequest) {
  try {
    const user = await AuthService.authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { adminUsers } = await initializeServices();
    const fullUser = await adminUsers.findById(user.userId);

    if (!fullUser || !fullUser.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: fullUser._id,
        email: fullUser.email,
        name: fullUser.name,
        role: fullUser.role,
        lastLogin: fullUser.lastLogin,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}