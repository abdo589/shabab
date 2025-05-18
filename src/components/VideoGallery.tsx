
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play } from 'lucide-react';

interface VideoItem {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: 'فعاليات حزب مستقبل وطن - 2025',
    url: 'https://drive.google.com/file/d/1USCsCx4BY9XA6-_n1TYgtib9SAH-fobY/view',
    thumbnail: '/lovable-uploads/fe02e7e0-8352-4fa7-824d-c1a6bf5e1d16.png'
  },
  {
    id: 2,
    title: 'مبادرات أمانة الشباب - 2025',
    url: 'https://drive.google.com/file/d/1qxBoMykJ23J3ly76ajrbO55gGiJjQzCm/view',
    thumbnail: '/lovable-uploads/1809ea4e-64e6-4fc4-9c3d-525cb47826c7.png'
  }
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  // Convert Google Drive link to embedded format
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([^\/]*)/)?.[1] || '';
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div 
                className="relative cursor-pointer group"
                onClick={() => handleOpenVideo(video)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                  <div className="bg-white bg-opacity-80 rounded-full p-4 group-hover:bg-opacity-100 transition-all">
                    <Play className="h-8 w-8 text-blue-dark" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{video.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={handleCloseVideo}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe 
              src={selectedVideo ? getEmbedUrl(selectedVideo.url) : ''} 
              className="w-full h-full" 
              title={selectedVideo?.title || 'Video'}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoGallery;
