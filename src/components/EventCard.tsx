
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
          <h3 className="font-bold text-xl">{event.title}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="h-4 w-4 ml-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{event.description.substring(0, 100)}...</p>
        <Link 
          to={`/events/${event.id}`} 
          className="inline-block bg-blue-gradient text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          عرض التفاصيل
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
