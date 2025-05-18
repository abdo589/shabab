
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard, { Event } from '../components/EventCard';

const events: Event[] = [
  {
    id: 1,
    title: 'افطار صائم',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'مبادرة لتوزيع وجبات إفطار للصائمين خلال شهر رمضان المبارك، بمشاركة شباب الحزب.',
    image: '/lovable-uploads/e9314317-50ba-4adc-a03f-83ea362abb05.png'
  },
  {
    id: 2,
    title: 'توزيع مواد غذائية',
    date: '2025',
    location: 'قسم المنتزة أول، الإسكندرية',
    description: 'حملة لتوزيع المواد الغذائية الأساسية على الأسر المحتاجة في المنطقة.',
    image: '/lovable-uploads/fe02e7e0-8352-4fa7-824d-c1a6bf5e1d16.png'
  },
  {
    id: 3,
    title: 'مبادرة شتاء دافئ',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'حملة لتوزيع البطاطين والملابس الشتوية للأسر الأكثر احتياجًا في فصل الشتاء.',
    image: '/lovable-uploads/1809ea4e-64e6-4fc4-9c3d-525cb47826c7.png'
  },
  {
    id: 4,
    title: 'حملة توزيع الأدوية',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'مبادرة صحية لتقديم الأدوية الأساسية للمرضى غير القادرين على شرائها.',
    image: '/lovable-uploads/f438aa05-cedc-4a42-b39d-bc56d20b657a.png'
  },
  {
    id: 5,
    title: 'مبادرة توعوية للشباب',
    date: '2025',
    location: 'مقر الحزب بمنطقة المنتزة، الإسكندرية',
    description: 'لقاء توعوي للشباب حول أهمية المشاركة السياسية والمجتمعية وتنمية المهارات.',
    image: '/lovable-uploads/0eda278c-c04f-415b-82ad-2ea7aa83e303.png'
  },
  {
    id: 6,
    title: 'لقاء قيادات الحزب',
    date: '2025',
    location: 'المقر الرئيسي للحزب بالإسكندرية',
    description: 'لقاء تنسيقي بين قيادات الحزب بأمانة الشباب بقسم المنتزة لمناقشة خطط العمل المستقبلية.',
    image: '/lovable-uploads/b130b23e-dc35-48b7-a821-ca5b238b35ca.png'
  }
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => 
    event.title.includes(searchTerm) || 
    event.description.includes(searchTerm) ||
    event.location.includes(searchTerm)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-blue-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3 text-center">الفعاليات</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto text-center">
              استعرض أحدث فعاليات ومبادرات حزب مستقبل وطن بأمانة الشباب بقسم المنتزة أول
            </p>
          </div>
        </section>
        
        {/* Events Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="ابحث عن فعالية..."
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-dark"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">لا توجد فعاليات تطابق البحث</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
