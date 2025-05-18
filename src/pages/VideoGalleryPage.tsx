
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VideoGallery from '../components/VideoGallery';

const VideoGalleryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-blue-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3 text-center">الفيديوهات</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto text-center">
              شاهد فيديوهات فعاليات ومبادرات حزب مستقبل وطن - أمانة الشباب بقسم المنتزة أول
            </p>
          </div>
        </section>
        
        {/* Videos Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <VideoGallery />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoGalleryPage;
