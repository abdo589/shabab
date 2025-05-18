
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Event } from '../components/EventCard';

const events: Event[] = [
  {
    id: 1,
    title: 'افطار صائم',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'مبادرة لتوزيع وجبات إفطار للصائمين خلال شهر رمضان المبارك، بمشاركة شباب الحزب. تأتي هذه المبادرة ضمن سلسلة من الأنشطة الخيرية التي ينفذها حزب مستقبل وطن خلال الشهر الكريم، وتهدف إلى مساعدة الأسر الأكثر احتياجًا وتعزيز روح التكافل الاجتماعي. شارك في المبادرة عدد كبير من شباب الحزب الذين تطوعوا في إعداد وتغليف وتوزيع وجبات الإفطار على المحتاجين والمارة في الشوارع قبل موعد الإفطار.',
    image: '/lovable-uploads/e9314317-50ba-4adc-a03f-83ea362abb05.png'
  },
  {
    id: 2,
    title: 'توزيع مواد غذائية',
    date: '2025',
    location: 'قسم المنتزة أول، الإسكندرية',
    description: 'حملة لتوزيع المواد الغذائية الأساسية على الأسر المحتاجة في المنطقة. تم تنفيذ هذه المبادرة بالتعاون مع رجال الأعمال والمتبرعين من أهالي المنطقة، حيث تم تجهيز كراتين مواد غذائية أساسية تشمل (أرز، زيت، سكر، مكرونة، شاي، فول، عدس) وغيرها من المستلزمات الضرورية. استهدفت المبادرة الأسر الأكثر احتياجًا في منطقة المنتزة، وتم توزيع المساعدات بعد عمل بحث اجتماعي دقيق لضمان وصولها لمستحقيها الحقيقيين.',
    image: '/lovable-uploads/fe02e7e0-8352-4fa7-824d-c1a6bf5e1d16.png'
  },
  {
    id: 3,
    title: 'مبادرة شتاء دافئ',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'حملة لتوزيع البطاطين والملابس الشتوية للأسر الأكثر احتياجًا في فصل الشتاء. تأتي هذه المبادرة انطلاقًا من حرص حزب مستقبل وطن على مساعدة الأسر الفقيرة على مواجهة برودة الشتاء، خاصة في المناطق الأكثر فقرًا. قام متطوعو الحزب بتوزيع البطاطين والملابس الشتوية الجديدة على الأسر المحتاجة، بالإضافة إلى توزيع مدفئات على بعض الأسر الأشد احتياجًا، وخاصة كبار السن والمرضى.',
    image: '/lovable-uploads/1809ea4e-64e6-4fc4-9c3d-525cb47826c7.png'
  },
  {
    id: 4,
    title: 'حملة توزيع الأدوية',
    date: '2025',
    location: 'منطقة المنتزة، الإسكندرية',
    description: 'مبادرة صحية لتقديم الأدوية الأساسية للمرضى غير القادرين على شرائها. تم تنفيذ هذه المبادرة بالتعاون مع عدد من الصيدليات والأطباء المتطوعين، حيث تم توفير الأدوية الأساسية للمرضى المزمنين من كبار السن وذوي الدخل المحدود. شملت المبادرة أيضًا تنظيم قافلة طبية للكشف المجاني على المرضى وتقديم الاستشارات الطبية لهم.',
    image: '/lovable-uploads/f438aa05-cedc-4a42-b39d-bc56d20b657a.png'
  },
  {
    id: 5,
    title: 'مبادرة توعوية للشباب',
    date: '2025',
    location: 'مقر الحزب بمنطقة المنتزة، الإسكندرية',
    description: 'لقاء توعوي للشباب حول أهمية المشاركة السياسية والمجتمعية وتنمية المهارات. تضمن اللقاء عدة محاضرات قدمها خبراء في المجال السياسي والاجتماعي، وورش عمل تفاعلية لتنمية مهارات الشباب في مجالات القيادة والتواصل وحل المشكلات. كما تم مناقشة دور الشباب في التنمية المستدامة وكيفية المساهمة بفعالية في تحقيق رؤية مصر 2030.',
    image: '/lovable-uploads/0eda278c-c04f-415b-82ad-2ea7aa83e303.png'
  },
  {
    id: 6,
    title: 'لقاء قيادات الحزب',
    date: '2025',
    location: 'المقر الرئيسي للحزب بالإسكندرية',
    description: 'لقاء تنسيقي بين قيادات الحزب بأمانة الشباب بقسم المنتزة لمناقشة خطط العمل المستقبلية. تم خلال اللقاء استعراض إنجازات الفترة الماضية، ومناقشة التحديات التي تواجه العمل الحزبي، ووضع خطة عمل للفترة المقبلة. كما تم تكريم المتميزين من شباب الحزب الذين ساهموا بشكل فعال في إنجاح المبادرات والأنشطة السابقة.',
    image: '/lovable-uploads/b130b23e-dc35-48b7-a821-ca5b238b35ca.png'
  }
];

const EventDetailPage = () => {
  const { id } = useParams<{id: string}>();
  const eventId = parseInt(id || '0');
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-600">الفعالية غير موجودة</h1>
            <p className="mt-4 mb-8">عذراً، لا يمكن العثور على الفعالية المطلوبة</p>
            <Link 
              to="/events" 
              className="inline-flex items-center bg-blue-dark text-white px-6 py-3 rounded-md hover:bg-blue-darkest transition-colors"
            >
              <ArrowRight className="ml-2 h-5 w-5" />
              العودة إلى صفحة الفعاليات
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Event Header */}
        <div 
          className="h-[50vh] bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="container mx-auto px-4 py-10 text-white">
              <Link 
                to="/events" 
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة إلى الفعاليات
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Main Content */}
              <div className="md:w-2/3">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold mb-6">تفاصيل الفعالية</h2>
                  <p>{event.description}</p>
                </div>
                
                {/* Image Gallery */}
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">صور من الفعالية</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <img src={event.image} alt={event.title} className="rounded-lg hover:opacity-90 transition-opacity" />
                    {eventId === 1 && (
                      <>
                        <img src="/lovable-uploads/a6046c0f-a5b8-45a3-a9f0-4113fcc02863.png" alt="صورة إضافية" className="rounded-lg hover:opacity-90 transition-opacity" />
                        <img src="/lovable-uploads/e9314317-50ba-4adc-a03f-83ea362abb05.png" alt="صورة إضافية" className="rounded-lg hover:opacity-90 transition-opacity" />
                      </>
                    )}
                    {eventId === 2 && (
                      <>
                        <img src="/lovable-uploads/fe02e7e0-8352-4fa7-824d-c1a6bf5e1d16.png" alt="صورة إضافية" className="rounded-lg hover:opacity-90 transition-opacity" />
                        <img src="/lovable-uploads/9c95c8ed-003a-4894-9f10-6fd4da190741.png" alt="صورة إضافية" className="rounded-lg hover:opacity-90 transition-opacity" />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                  <h3 className="text-lg font-bold mb-4">معلومات الفعالية</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Calendar className="h-5 w-5 ml-3 text-blue-dark" />
                      <div>
                        <span className="block text-sm text-gray-500">التاريخ</span>
                        <span className="font-medium">{event.date}</span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-5 w-5 ml-3 text-blue-dark" />
                      <div>
                        <span className="block text-sm text-gray-500">المكان</span>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-5 w-5 ml-3 text-blue-dark" />
                      <div>
                        <span className="block text-sm text-gray-500">المنظمون</span>
                        <span className="font-medium">أمانة الشباب - قسم منتزة أول</span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link 
                      to="/register" 
                      className="block w-full bg-blue-gradient text-white text-center py-3 rounded-md hover:opacity-90 transition-all"
                    >
                      انضم إلينا للمشاركة في الفعاليات
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;
