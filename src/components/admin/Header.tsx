
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">لوحة التحكم</h2>
      <Button variant="outline" onClick={onLogout} className="text-sm">
        تسجيل الخروج
      </Button>
    </div>
  );
};

export default Header;
