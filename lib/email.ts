import nodemailer from 'nodemailer';
import { Contact } from './db-schemas';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactNotification(contact: Contact): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webbuddies.com';
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: `New Lead: ${contact.name} - ${contact.projectType}`,
      html: this.generateContactNotificationHTML(contact),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send contact notification:', error);
      throw new Error('Failed to send notification email');
    }
  }

  async sendContactConfirmation(contact: Contact): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: contact.email,
      subject: 'Thank you for contacting Web Buddies!',
      html: this.generateContactConfirmationHTML(contact),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send contact confirmation:', error);
      // Don't throw error for confirmation emails
    }
  }

  private generateContactNotificationHTML(contact: Contact): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead - Web Buddies</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-top: 5px; }
          .priority { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Lead from Web Buddies Website</h1>
          </div>
          <div class="content">
            <div class="priority">
              <strong>Priority:</strong> ${this.getPriorityLevel(contact.budget, contact.timeline)}
            </div>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${contact.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${contact.email}</div>
            </div>
            
            ${contact.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${contact.phone}</div>
            </div>
            ` : ''}
            
            ${contact.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${contact.company}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Project Type:</div>
              <div class="value">${this.formatProjectType(contact.projectType)}</div>
            </div>
            
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">${this.formatBudget(contact.budget)}</div>
            </div>
            
            <div class="field">
              <div class="label">Timeline:</div>
              <div class="value">${this.formatTimeline(contact.timeline)}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${contact.message}</div>
            </div>
            
            <div class="field">
              <div class="label">Source:</div>
              <div class="value">${contact.source}</div>
            </div>
            
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date(contact.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateContactConfirmationHTML(contact: Contact): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for contacting Web Buddies</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .cta { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${contact.name}! 🎉</h1>
          </div>
          <div class="content">
            <p>We've received your inquiry about <strong>${this.formatProjectType(contact.projectType)}</strong> and we're excited to help bring your vision to life!</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a customized proposal for your project</li>
              <li>You'll receive a detailed quote and timeline</li>
              <li>We'll schedule a call to discuss your project in detail</li>
            </ul>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/projects">latest projects</a></li>
              <li>Learn more about our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/services">services</a></li>
              <li>Connect with us on social media</li>
            </ul>
            
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/projects" class="cta">View Our Work</a>
            
            <p>Best regards,<br>
            <strong>The Web Buddies Team</strong><br>
            Modern Websites & Scalable Web Applications</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 14px; color: #6b7280;">
              Need immediate assistance? Reply to this email or call us at ${process.env.COMPANY_PHONE || '+1 (555) 123-4567'}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getPriorityLevel(budget: string, timeline: string): string {
    const highBudget = ['25k-50k', '50k-plus'].includes(budget);
    const urgentTimeline = ['asap', '1-month'].includes(timeline);
    
    if (highBudget && urgentTimeline) return '🔥 HIGH PRIORITY';
    if (highBudget || urgentTimeline) return '⚡ MEDIUM PRIORITY';
    return '📋 STANDARD PRIORITY';
  }

  private formatProjectType(type: string): string {
    const types: Record<string, string> = {
      'website': 'Website Development',
      'web-app': 'Web Application',
      'mern-stack': 'MERN Stack Application',
      'nextjs': 'Next.js Website',
      'dashboard': 'Admin Dashboard',
      'api': 'API Development',
      'other': 'Other'
    };
    return types[type] || type;
  }

  private formatBudget(budget: string): string {
    const budgets: Record<string, string> = {
      'under-5k': 'Under $5,000',
      '5k-10k': '$5,000 - $10,000',
      '10k-25k': '$10,000 - $25,000',
      '25k-50k': '$25,000 - $50,000',
      '50k-plus': '$50,000+'
    };
    return budgets[budget] || budget;
  }

  private formatTimeline(timeline: string): string {
    const timelines: Record<string, string> = {
      'asap': 'ASAP',
      '1-month': '1 Month',
      '2-3-months': '2-3 Months',
      '3-6-months': '3-6 Months',
      'flexible': 'Flexible'
    };
    return timelines[timeline] || timeline;
  }
}