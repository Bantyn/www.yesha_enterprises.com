import { NextRequest, NextResponse } from 'next/server'
import os from 'os'
import { connectToDatabase } from '@/lib/db-utils'

export async function GET(request: NextRequest) {
  try {
    // Get system information
    const systemInfo: {
      server: {
        uptime: number
        platform: string
        arch: string
        nodeVersion: string
        memory: {
          total: number
          free: number
          used: number
          usagePercent: number
        }
        cpu: {
          cores: number
          model: string
          loadAverage: number[]
        }
      }
      database: {
        status: string
        name?: string
        collections?: number
        error?: string
      }
      timestamp: string
    } = {
      server: {
        uptime: Math.floor(process.uptime()),
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        memory: {
          total: Math.round(os.totalmem() / 1024 / 1024), // MB
          free: Math.round(os.freemem() / 1024 / 1024), // MB
          used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024), // MB
          usagePercent: Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)
        },
        cpu: {
          cores: os.cpus().length,
          model: os.cpus()[0]?.model || 'Unknown',
          loadAverage: os.loadavg()
        }
      },
      database: {
        status: 'disconnected'
      },
      timestamp: new Date().toISOString()
    }

    // Check database connection
    try {
      const db = await connectToDatabase()
      const collections = await db.collections()
      systemInfo.database = {
        status: 'connected',
        name: 'geyser_store',
        collections: collections.length
      }
    } catch (dbError) {
      systemInfo.database = {
        status: 'disconnected',
        error: 'Database connection failed'
      }
    }

    return NextResponse.json(systemInfo)
  } catch (error) {
    console.error('System info error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch system information' },
      { status: 500 }
    )
  }
}