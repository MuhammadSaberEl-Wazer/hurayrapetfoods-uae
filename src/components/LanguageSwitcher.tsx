import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/** UAE flag = Arabic, USA flag = English */
const LOCALES = [
  { code: 'en' as const, flag: '🇺🇸', label: 'English' },
  { code: 'ar' as const, flag: '🇦🇪', label: 'العربية' },
] as const;

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function LanguageSwitcher({ variant = 'light', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const isLight = variant === 'light';
  const triggerClass = isLight
    ? 'border-white/30 bg-transparent text-white hover:bg-white/10 focus:ring-white/50 [&>span]:text-white'
    : '';

  return (
    <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
      <SelectTrigger
        className={`w-[130px] shrink-0 justify-center gap-2 text-center [&>span]:justify-center ${triggerClass} ${className}`}
        aria-label="Language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="text-center">
        {LOCALES.map(({ code, flag, label }) => (
          <SelectItem key={code} value={code} className="justify-center text-center">
            <span className="flex items-center justify-center gap-2">
              <span>{flag}</span>
              <span>{label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
