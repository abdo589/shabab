
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <motion.div 
      className="flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold">لوحة التحكم</h2>
      <Button variant="outline" onClick={onLogout} className="text-sm">
        تسجيل الخروج
      </Button>
    </motion.div>
  );
};

export default Header;
