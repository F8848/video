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
              <li key={video} className="flex items-center justify-center p-0 sm:p-0 rounded-2xl overflow-hidden border-0">
                <div className="relative w-full sm:w-[600px] aspect-video flex items-center justify-center">
                  {/* 背景虚化视频 */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60 z-0"
                    src={`/videos/${video}`}
                    aria-hidden="true"
                    tabIndex={-1}
                    autoPlay
                    loop
                    muted
                  />
                  {/* 前景主视频 */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center border border-gray-300 rounded-2xl shadow-inner overflow-hidden">
                    <video
                      className="w-full h-auto block rounded-2xl bg-black"
                      controls
                      src={`/videos/${video}`}
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
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
