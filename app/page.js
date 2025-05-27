"use client"
import { useEffect, useState } from "react";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/cvideo")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("加载失败");
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">视频列表</h1>
      {loading && <p className="text-lg sm:text-xl">加载中...</p>}
      {error && <p className="text-red-500 text-lg sm:text-xl">{error}</p>}
      {!loading && !error && (
        videos.length > 0 ? (
          <ul className="space-y-8 sm:space-y-12 w-full max-w-full sm:max-w-4xl">
            {videos.map((video) => (
              <li key={video} className="border rounded-xl p-8 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-12 bg-white/90 shadow-lg">
                <video
                  className="rounded-2xl shadow w-full sm:w-[600px] h-auto max-w-full"
                  controls
                  src={`/videos/${video}`}
                  style={{ aspectRatio: '16/9' }}
                />
                <span className="truncate text-lg sm:text-2xl font-semibold w-full text-center sm:text-left">{video}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg sm:text-xl">暂无视频</p>
        )
      )}
    </main>
  );
}
