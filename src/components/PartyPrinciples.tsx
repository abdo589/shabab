
import { motion } from 'framer-motion';

const PartyPrinciples = () => {
  const principles = [
    {
      title: "المشاركة السياسية",
      description: "تشجيع المشاركة السياسية الفعالة للشباب وتمكينهم من المساهمة في صناعة القرار"
    },
    {
      title: "العمل المجتمعي",
      description: "تنفيذ مبادرات وبرامج تسهم في تحسين حياة المواطنين وتلبية احتياجاتهم"
    },
    {
      title: "التنمية المستدامة",
      description: "دعم مشروعات التنمية المستدامة التي تحقق رؤية مصر 2030 وتعزز النمو الاقتصادي"
    },
    {
      title: "تعزيز الهوية الوطنية",
      description: "ترسيخ الهوية الوطنية والانتماء وتعزيز قيم المواطنة والولاء للوطن"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-blue-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">مبادئ وقيم الحزب</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            يؤمن حزب مستقبل وطن بمجموعة من المبادئ والقيم التي توجه عمله وأنشطته لخدمة الوطن
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {principles.map((principle, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
              <p className="text-sm opacity-90">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartyPrinciples;
