import { NextRequest, NextResponse } from 'next/server';
import { ProjectSchema } from '@/lib/db-schemas';
import { initializeServices, generateSlug } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { projects } = await initializeServices();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    let filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (featured === 'true') {
      filter.featured = true;
    }

    const allProjects = await projects.findAll(filter, {
      sort: { createdAt: -1 },
      skip: (page - 1) * limit,
      limit,
    });

    const total = await projects.count(filter);

    return NextResponse.json({
      projects: allProjects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
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

      const projectData = ProjectSchema.parse(body);
      const { projects } = await initializeServices();
      
      // Check if slug already exists
      const existingProject = await projects.findBySlug(projectData.slug);
      if (existingProject) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }

      const project = await projects.create(projectData);

      return NextResponse.json({
        success: true,
        project,
      });
    } catch (error) {
      console.error('Create project error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid project data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }
  })(request);
}