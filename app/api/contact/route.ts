import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/db-schemas';
import { initializeServices } from '@/lib/db-utils';
import { EmailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contactData = ContactSchema.parse(body);

    const { contacts } = await initializeServices();
    
    // Create contact record
    const contact = await contacts.create(contactData);

    // Send email notifications
    const emailService = new EmailService();
    
    try {
      // Send notification to admin
      await emailService.sendContactNotification(contact);
      
      // Send confirmation to user
      await emailService.sendContactConfirmation(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      contactId: contact._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: (error as any).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await import('@/lib/auth').then(auth => auth.AuthService.authenticateRequest(request));
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { contacts } = await initializeServices();
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filter = {};
    if (status && status !== 'all') {
      filter = { status };
    }

    const allContacts = await contacts.findAll(filter, {
      sort: { createdAt: -1 },
      skip: (page - 1) * limit,
      limit,
    });

    const total = await contacts.count(filter);
    const stats = await contacts.getStats();

    return NextResponse.json({
      contacts: allContacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}