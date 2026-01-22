import { NextRequest, NextResponse } from 'next/server';
import { ProjectSchema } from '@/lib/db-schemas';
import { initializeServices, generateSlug } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { projects } = await initializeServices();
    const project = await projects.findBySlug(slug);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
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
      const { projects } = await initializeServices();
      
      // Find existing project
      const existingProject = await projects.findBySlug(slug);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      // Generate new slug if title changed
      if (body.title && body.title !== existingProject.title && !body.slug) {
        body.slug = generateSlug(body.title);
      }

      // Validate updated data
      const projectData = ProjectSchema.partial().parse(body);
      
      // Check if new slug conflicts with existing projects
      if (projectData.slug && projectData.slug !== slug) {
        const conflictingProject = await projects.findBySlug(projectData.slug);
        if (conflictingProject) {
          return NextResponse.json(
            { error: 'A project with this slug already exists' },
            { status: 400 }
          );
        }
      }

      const updatedProject = await projects.update(existingProject._id!, projectData);

      return NextResponse.json({
        success: true,
        project: updatedProject,
      });
    } catch (error) {
      console.error('Update project error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid project data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update project' },
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
      const { projects } = await initializeServices();
      
      // Find existing project
      const existingProject = await projects.findBySlug(slug);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }

      await projects.delete(existingProject._id!);

      return NextResponse.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      console.error('Delete project error:', error);
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }
  })(request);
}