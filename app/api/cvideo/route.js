'use server';
// This file is part of the Next.js application and handles the API route for fetching video files.
import fs from 'fs';
import path from 'path';
export async function GET(request) {
  console.log('Fetching video files...');
  
  // 推荐将视频目录放在 public/videos 下
  const videosDirectory = path.join(process.cwd(), 'public', 'videos');
  try {
    if (!fs.existsSync(videosDirectory)) {
      return new Response(JSON.stringify({ videos: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const videoFiles = fs.readdirSync(videosDirectory);
    const filteredVideos = videoFiles.filter(file => file.endsWith('.mp4'));
    return new Response(JSON.stringify({ videos: filteredVideos }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ videos: [], error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}