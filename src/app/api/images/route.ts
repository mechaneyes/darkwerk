import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  
  try {
    const files = fs.readdirSync(imagesDirectory);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    
    return NextResponse.json(imageFiles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read images directory' }, { status: 500 });
  }
} 