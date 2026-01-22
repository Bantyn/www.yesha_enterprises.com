import { NextRequest, NextResponse } from 'next/server';
import { CategorySchema } from '@/lib/db-schemas';
import { initializeServices, generateSlug } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { categories } = await initializeServices();
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type') as 'project' | 'service' | null;
    
    let filter: any = {};
    if (type) {
      filter.type = type;
    }

    const allCategories = await categories.findAll(filter, {
      sort: { name: 1 },
    });

    return NextResponse.json({
      categories: allCategories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const body = await req.json();
      
      // Generate slug if not provided
      if (!body.slug && body.name) {
        body.slug = generateSlug(body.name);
      }

      const categoryData = CategorySchema.parse(body);
      const { categories } = await initializeServices();
      
      // Check if slug already exists
      const existingCategory = await categories.findBySlug(categoryData.slug);
      if (existingCategory) {
        return NextResponse.json(
          { error: 'A category with this slug already exists' },
          { status: 400 }
        );
      }

      const category = await categories.create(categoryData);

      return NextResponse.json({
        success: true,
        category,
      });
    } catch (error) {
      console.error('Create category error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid category data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
      );
    }
  })(request);
}
