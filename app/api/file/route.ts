import { del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function DELETE(request: Request) {
  const json = await request.json()
  await del(json.url);
  return NextResponse.json({});
}

export async function GET() {
  const { blobs } = await list();
  return Response.json(blobs);
}



// const {
//   folders: [firstFolder],
//   blobs: rootBlobs,
// } = await list({
//   mode: 'folded',
// });
 
// const { folders, blobs } = await list({
//   mode: 'folded',
//   prefix: firstFolder,
// });
