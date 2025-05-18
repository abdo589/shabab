
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard, { Event } from './EventCard';

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
  }
];

const FeaturedEvents = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">الفعاليات</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            أحدث أنشطة وفعاليات حزب مستقبل وطن - أمانة الشباب بقسم المنتزة أول بالإسكندرية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/events" 
            className="inline-block px-6 py-3 bg-blue-dark text-white rounded-md hover:bg-blue-darkest transition-colors"
          >
            عرض كل الفعاليات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
