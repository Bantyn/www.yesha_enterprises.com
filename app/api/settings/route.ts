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

    const { companyInfo, seo } = await initializeServices();
    
    const [info, seoSettings] = await Promise.all([
      companyInfo.getCompanyInfo(),
      seo.findOne({ page: 'home' }) // Assuming generic or home settings for now
    ]);

    return NextResponse.json({
      companyInfo: info,
      seo: seoSettings
    });

  } catch (error) {
    console.error('Settings API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await AuthService.authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, data } = body;
    const { companyInfo, seo } = await initializeServices();

    // Remove _id from data if present to avoid MongoDB update error
    const { _id, ...updateData } = data;

    if (type === 'company') {
      const updated = await companyInfo.updateCompanyInfo(updateData);
      return NextResponse.json({ success: true, data: updated });
    } 
    
    if (type === 'seo') {
      // Logic for updating SEO
      // simplified for now, assuming editing home page SEO globally
      const updated = await seo.upsertPageSEO('home', updateData);
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json(
      { error: 'Invalid update type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Settings API Update Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
