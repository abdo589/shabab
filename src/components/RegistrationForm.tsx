
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface FormData {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthDate: string;
  education: string;
  jobTitle: string;
  memberType: string;
}

const initialFormData: FormData = {
  fullName: '',
  nationalId: '',
  phone: '',
  email: '',
  address: '',
  gender: 'ذكر',
  birthDate: '',
  education: '',
  jobTitle: '',
  memberType: 'عضو',
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateNationalId = (id: string): boolean => {
    // Basic validation: 14 digits
    return /^\d{14}$/.test(id);
  };

  const validatePhone = (phone: string): boolean => {
    // Basic Egyptian phone number validation
    return /^01[0125][0-9]{8}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!validateNationalId(formData.nationalId)) {
      toast({
        title: "خطأ في الرقم القومي",
        description: "يجب أن يتكون الرقم القومي من 14 رقم",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يجب إدخال رقم هاتف مصري صحيح",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Save data to Supabase
      const { error } = await supabase
        .from('registrations')
        .insert({
          full_name: formData.fullName,
          national_id: formData.nationalId,
          phone: formData.phone,
          email: formData.email || null, // Handle empty strings
          address: formData.address,
          gender: formData.gender,
          birth_date: formData.birthDate,
          education: formData.education || null, // Handle empty strings
          job_title: formData.jobTitle || null, // Handle empty strings
          member_type: formData.memberType // Add member type
        });

      if (error) throw error;
      
      toast({
        title: "تم التسجيل بنجاح!",
        description: "شكراً لانضمامك إلى حزب مستقبل وطن. سيتم التواصل معك قريباً.",
      });
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "حدث خطأ",
        description: "لم يتم التسجيل، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Personal Information */}
            <h3 className="text-lg font-semibold mb-4">البيانات الشخصية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم بالكامل</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="أدخل الاسم الرباعي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationalId">الرقم القومي</Label>
                <Input
                  id="nationalId"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  required
                  placeholder="أدخل الرقم القومي المكون من 14 رقم"
                  maxLength={14}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="01xxxxxxxxx"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="العنوان بالتفصيل"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الجنس</Label>
                <RadioGroup 
                  defaultValue={formData.gender} 
                  onValueChange={(value) => handleSelectChange('gender', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="ذكر" id="male" />
                    <Label htmlFor="male">ذكر</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="أنثى" id="female" />
                    <Label htmlFor="female">أنثى</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>نوع العضوية</Label>
              <RadioGroup 
                defaultValue={formData.memberType} 
                onValueChange={(value) => handleSelectChange('memberType', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="عضو" id="regular" />
                  <Label htmlFor="regular">عضو</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="عضو تنظيمي" id="organizational" />
                  <Label htmlFor="organizational">عضو تنظيمي</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Professional Information */}
            <h3 className="text-lg font-semibold mb-4 mt-8">المعلومات المهنية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">المؤهل التعليمي</Label>
                <Select onValueChange={(value) => handleSelectChange('education', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المؤهل التعليمي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ثانوية عامة">ثانوية عامة</SelectItem>
                    <SelectItem value="دبلوم فني">دبلوم فني</SelectItem>
                    <SelectItem value="بكالوريوس">بكالوريوس/ليسانس</SelectItem>
                    <SelectItem value="ماجستير">ماجستير</SelectItem>
                    <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">المهنة/الوظيفة</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="أدخل المسمى الوظيفي الحالي"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-gradient hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    جاري التسجيل...
                  </span>
                ) : 'إرسال البيانات'}
              </Button>
            </div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
