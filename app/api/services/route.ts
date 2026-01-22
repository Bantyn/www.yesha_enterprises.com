import { NextRequest, NextResponse } from 'next/server';
import { ServiceSchema } from '@/lib/db-schemas';
import { initializeServices, generateSlug } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { services } = await initializeServices();
    const { searchParams } = new URL(request.url);
    
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filter: any = {};
    
    if (featured === 'true') {
      filter.featured = true;
    }

    const allServices = await services.findAll(filter, {
      sort: { createdAt: -1 },
      skip: (page - 1) * limit,
      limit,
    });

    const total = await services.count(filter);

    return NextResponse.json({
      services: allServices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const body = await req.json();
      
      // Generate slug if not provided
      if (!body.slug && body.title) {
        body.slug = generateSlug(body.title);
      }

      const serviceData = ServiceSchema.parse(body);
      const { services } = await initializeServices();
      
      // Check if slug already exists
      const existingService = await services.findBySlug(serviceData.slug);
      if (existingService) {
        return NextResponse.json(
          { error: 'A service with this slug already exists' },
          { status: 400 }
        );
      }

      const service = await services.create(serviceData);

      return NextResponse.json({
        success: true,
        service,
      });
    } catch (error) {
      console.error('Create service error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid service data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }
  })(request);
}