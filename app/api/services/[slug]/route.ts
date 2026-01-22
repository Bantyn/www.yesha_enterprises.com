import { NextRequest, NextResponse } from 'next/server';
import { ServiceSchema } from '@/lib/db-schemas';
import { initializeServices, generateSlug } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { services } = await initializeServices();
    const service = await services.findBySlug(slug);

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Get service error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const { slug } = await params;
      const body = await req.json();
      const { services } = await initializeServices();
      
      // Find existing service
      const existingService = await services.findBySlug(slug);
      if (!existingService) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }

      // Generate new slug if title changed
      if (body.title && body.title !== existingService.title && !body.slug) {
        body.slug = generateSlug(body.title);
      }

      // Validate updated data
      const serviceData = ServiceSchema.partial().parse(body);
      
      // Check if new slug conflicts with existing services
      if (serviceData.slug && serviceData.slug !== slug) {
        const conflictingService = await services.findBySlug(serviceData.slug);
        if (conflictingService) {
          return NextResponse.json(
            { error: 'A service with this slug already exists' },
            { status: 400 }
          );
        }
      }

      const updatedService = await services.update(existingService._id!, serviceData);

      return NextResponse.json({
        success: true,
        service: updatedService,
      });
    } catch (error) {
      console.error('Update service error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid service data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update service' },
        { status: 500 }
      );
    }
  })(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const { slug } = await params;
      const { services } = await initializeServices();
      
      // Find existing service
      const existingService = await services.findBySlug(slug);
      if (!existingService) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        );
      }

      await services.delete(existingService._id!);

      return NextResponse.json({
        success: true,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      console.error('Delete service error:', error);
      return NextResponse.json(
        { error: 'Failed to delete service' },
        { status: 500 }
      );
    }
  })(request);
}
