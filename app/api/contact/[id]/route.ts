import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/db-schemas';
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
      const { contacts } = await initializeServices();
      
      // Validate updated data (partial update)
      const contactData = ContactSchema.partial().parse(body);
      
      const updatedContact = await contacts.update(id, contactData);

      if (!updatedContact) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        contact: updatedContact,
      });
    } catch (error) {
      console.error('Update contact error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return NextResponse.json(
          { error: 'Invalid contact data', details: (error as any).errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update contact' },
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
      const { contacts } = await initializeServices();
      
      const success = await contacts.delete(id);

      if (!success) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Contact deleted successfully',
      });
    } catch (error) {
      console.error('Delete contact error:', error);
      return NextResponse.json(
        { error: 'Failed to delete contact' },
        { status: 500 }
      );
    }
  })(request);
}
