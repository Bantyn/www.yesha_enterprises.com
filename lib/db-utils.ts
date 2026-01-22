import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { 
  Project, 
  Service, 
  Contact, 
  AdminUser, 
  SEOSettings, 
  CompanyInfo 
} from './db-schemas';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (client && db) {
    return { client, db };
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'webbuddies';

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  return { client, db };
}

// Generic database operations
export class DatabaseService<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private async getCollection(): Promise<Collection> {
    await connectToDatabase();
    return db.collection(this.collectionName);
  }

  async findAll(filter: any = {}, options: any = {}): Promise<T[]> {
    const collection = await this.getCollection();
    const results = await collection.find(filter, options).toArray();
    return results as T[];
  }

  async findById(id: string): Promise<T | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result as T | null;
  }

  async findOne(filter: any): Promise<T | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne(filter);
    return result as T | null;
  }

  async create(data: Omit<T, '_id'>): Promise<T> {
    const collection = await this.getCollection();
    const result = await collection.insertOne(data as any);
    return { ...data, _id: result.insertedId.toString() } as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result as T | null;
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async count(filter: any = {}): Promise<number> {
    const collection = await this.getCollection();
    return await collection.countDocuments(filter);
  }
}

// Specific service classes
export class ProjectService extends DatabaseService<Project> {
  constructor() {
    super('projects');
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return await this.findOne({ slug });
  }

  async findFeatured(): Promise<Project[]> {
    return await this.findAll({ featured: true }, { sort: { createdAt: -1 } });
  }

  async findByCategory(category: string): Promise<Project[]> {
    return await this.findAll({ category }, { sort: { createdAt: -1 } });
  }
}

export class ServiceService extends DatabaseService<Service> {
  constructor() {
    super('services');
  }

  async findBySlug(slug: string): Promise<Service | null> {
    return await this.findOne({ slug });
  }

  async findFeatured(): Promise<Service[]> {
    return await this.findAll({ featured: true }, { sort: { createdAt: -1 } });
  }
}

export class ContactService extends DatabaseService<Contact> {
  constructor() {
    super('contacts');
  }

  async findByStatus(status: string): Promise<Contact[]> {
    return await this.findAll({ status }, { sort: { createdAt: -1 } });
  }

  async getStats(): Promise<{
    total: number;
    new: number;
    inDiscussion: number;
    closed: number;
  }> {
    const [total, newCount, inDiscussion, closed] = await Promise.all([
      this.count(),
      this.count({ status: 'new' }),
      this.count({ status: 'in-discussion' }),
      this.count({ status: 'closed' })
    ]);

    return { total, new: newCount, inDiscussion, closed };
  }
}

export class AdminUserService extends DatabaseService<AdminUser> {
  constructor() {
    super('admin_users');
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    return await this.findOne({ email });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.update(id, { lastLogin: new Date() } as Partial<AdminUser>);
  }
}

export class SEOService extends DatabaseService<SEOSettings> {
  constructor() {
    super('seo_settings');
  }

  async findByPage(page: string): Promise<SEOSettings | null> {
    return await this.findOne({ page });
  }

  async upsertPageSEO(page: string, data: Partial<SEOSettings>): Promise<SEOSettings> {
    const existing = await this.findByPage(page);
    if (existing) {
      return await this.update(existing._id!, data) as SEOSettings;
    } else {
      return await this.create({ ...data, page } as Omit<SEOSettings, '_id'>);
    }
  }
}

export class CompanyInfoService extends DatabaseService<CompanyInfo> {
  constructor() {
    super('company_info');
  }

  async getCompanyInfo(): Promise<CompanyInfo | null> {
    const info = await this.findAll({}, { limit: 1 });
    return info[0] || null;
  }

  async updateCompanyInfo(data: Partial<CompanyInfo>): Promise<CompanyInfo> {
    const existing = await this.getCompanyInfo();
    if (existing) {
      return await this.update(existing._id!, data) as CompanyInfo;
    } else {
      return await this.create(data as Omit<CompanyInfo, '_id'>);
    }
  }
}

// Initialize services
export async function initializeServices() {
  await connectToDatabase();
  
  return {
    projects: new ProjectService(),
    services: new ServiceService(),
    contacts: new ContactService(),
    adminUsers: new AdminUserService(),
    seo: new SEOService(),
    companyInfo: new CompanyInfoService(),
  };
}

// Utility functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function sanitizeForSEO(text: string, maxLength: number = 160): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, maxLength)
    .trim();
}