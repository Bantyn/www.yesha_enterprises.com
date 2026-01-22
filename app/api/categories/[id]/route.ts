import { NextRequest, NextResponse } from 'next/server';
import { CategorySchema } from '@/lib/db-schemas';
import { initializeServices } from '@/lib/db-utils';
import { AuthService } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const { id } = await params;
      const body = await req.json();
      const categoryData = CategorySchema.partial().parse(body);
      
      const { categories } = await initializeServices();
      const updatedCategory = await categories.update(id, categoryData);

      if (!updatedCategory) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        category: updatedCategory,
      });
    } catch (error) {
      console.error('Update category error:', error);
      return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
      );
    }
  })(request);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return AuthService.requireAuth(async (req: NextRequest, user) => {
    try {
      const { id } = await params;
      const { categories, projects } = await initializeServices();
      
      // Check if any projects use this category
      const category = await categories.findById(id);
      if (category) {
        const projectCount = await projects.count({ category: category.slug });
        if (projectCount > 0) {
          return NextResponse.json(
            { error: `Cannot delete category: ${projectCount} projects are using it.` },
            { status: 400 }
          );
        }
      }

      const success = await categories.delete(id);

      if (!success) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
      });
    } catch (error) {
      console.error('Delete category error:', error);
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      );
    }
  })(request);
}
