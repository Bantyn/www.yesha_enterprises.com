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

    const { projects, contacts, companyInfo } = await initializeServices();

    const [
      projectCount,
      contactStats,
      recentContacts,
      monthlyStats,
      info
    ] = await Promise.all([
      projects.count(),
      contacts.getStats(),
      contacts.findAll({}, { sort: { createdAt: -1 }, limit: 5 }),
      contacts.getMonthlyStats(),
      companyInfo.getCompanyInfo()
    ]);

    return NextResponse.json({
      stats: {
        totalProjects: projectCount,
        totalContacts: contactStats.total,
        newContacts: contactStats.new,
        inDiscussionContacts: contactStats.inDiscussion,
        closedContacts: contactStats.closed,
      },
      contacts: recentContacts,
      graphData: monthlyStats,
      systemInfo: {
        version: info?.systemVersion || '1.0.0',
        maintenanceMode: info?.maintenanceMode || false,
      }
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
