import { google } from "googleapis"
import { Readable } from "stream"

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/drive"],
})

const drive = google.drive({ version: "v3", auth })

function bufferToStream(buffer: Buffer) {
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}

export async function uploadToDrive(
  buffer: Buffer,
  fileName: string,
  folderId: string,
  sharedDriveId: string
) {
  if (!sharedDriveId) {
    throw new Error("Shared Drive ID is missing")
  }

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType: "image/jpeg",
      body: bufferToStream(buffer),
    },
    fields: "id",
    supportsAllDrives: true, 
  })

  const fileId = response.data.id!

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
    supportsAllDrives: true,
  })

  return `https://drive.google.com/uc?id=${fileId}`
}
