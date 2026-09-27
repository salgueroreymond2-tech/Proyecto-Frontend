import React from 'react';

type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number | string;
  strokeWidth?: number | string;
};

const iconNames = {
  Activity: 'monitoring',
  AlertCircle: 'error',
  ArrowRight: 'arrow_forward',
  Award: 'workspace_premium',
  BadgeDollarSign: 'paid',
  BarChart3: 'bar_chart',
  Bell: 'notifications',
  CalendarDays: 'calendar_month',
  Camera: 'photo_camera',
  Check: 'check',
  CheckCircle2: 'check_circle',
  ChevronDown: 'keyboard_arrow_down',
  ChevronLeft: 'chevron_left',
  ChevronRight: 'chevron_right',
  Clock: 'schedule',
  Crown: 'workspace_premium',
  Database: 'database',
  Dumbbell: 'fitness_center',
  Edit3: 'edit',
  Eye: 'visibility',
  EyeOff: 'visibility_off',
  Flame: 'local_fire_department',
  GitCommit: 'commit',
  Heart: 'favorite',
  Info: 'info',
  LayoutDashboard: 'dashboard',
  Lock: 'lock',
  LockKeyhole: 'lock',
  LogOut: 'logout',
  Mail: 'mail',
  Medal: 'military_tech',
  Menu: 'menu',
  MessageCircle: 'chat_bubble',
  MessageSquare: 'forum',
  Moon: 'dark_mode',
  Newspaper: 'newspaper',
  Play: 'play_arrow',
  RotateCcw: 'restart_alt',
  Save: 'save',
  Send: 'send',
  Server: 'dns',
  Share2: 'share',
  Shield: 'shield',
  ShieldAlert: 'gpp_maybe',
  ShieldCheck: 'verified_user',
  Sliders: 'tune',
  SlidersHorizontal: 'tune',
  Sparkles: 'auto_awesome',
  DirectionsBike: 'directions_bike',
  SportsBaseball: 'sports_baseball',
  SportsBasketball: 'sports_basketball',
  SportsFootball: 'sports_football',
  SportsMma: 'sports_mma',
  SportsMotorsports: 'sports_motorsports',
  SportsSoccer: 'sports_soccer',
  SportsTennis: 'sports_tennis',
  Sun: 'light_mode',
  Swords: 'swords',
  Target: 'my_location',
  Trash2: 'delete',
  TrendingUp: 'trending_up',
  Trophy: 'emoji_events',
  Unlock: 'lock_open',
  User: 'person',
  UserCheck: 'how_to_reg',
  Users: 'groups',
  Volume2: 'volume_up',
  VolumeX: 'volume_off',
  X: 'close',
  Zap: 'bolt',
} as const;

function createMaterialIcon(name: keyof typeof iconNames) {
  const MaterialIcon: React.FC<IconProps> = ({ className = '', size, style, strokeWidth: _strokeWidth, children: _children, ...props }) => (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded inline-flex items-center justify-center leading-none select-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24",
        ...style,
      }}
      {...props}
    >
      {iconNames[name]}
    </span>
  );

  MaterialIcon.displayName = name;
  return MaterialIcon;
}

export const Activity = createMaterialIcon('Activity');
export const AlertCircle = createMaterialIcon('AlertCircle');
export const ArrowRight = createMaterialIcon('ArrowRight');
export const Award = createMaterialIcon('Award');
export const BadgeDollarSign = createMaterialIcon('BadgeDollarSign');
export const BarChart3 = createMaterialIcon('BarChart3');
export const Bell = createMaterialIcon('Bell');
export const CalendarDays = createMaterialIcon('CalendarDays');
export const Camera = createMaterialIcon('Camera');
export const Check = createMaterialIcon('Check');
export const CheckCircle2 = createMaterialIcon('CheckCircle2');
export const ChevronDown = createMaterialIcon('ChevronDown');
export const ChevronLeft = createMaterialIcon('ChevronLeft');
export const ChevronRight = createMaterialIcon('ChevronRight');
export const Clock = createMaterialIcon('Clock');
export const Crown = createMaterialIcon('Crown');
export const Database = createMaterialIcon('Database');
export const Dumbbell = createMaterialIcon('Dumbbell');
export const Edit3 = createMaterialIcon('Edit3');
export const Eye = createMaterialIcon('Eye');
export const EyeOff = createMaterialIcon('EyeOff');
export const Flame = createMaterialIcon('Flame');
export const GitCommit = createMaterialIcon('GitCommit');
export const Heart = createMaterialIcon('Heart');
export const Info = createMaterialIcon('Info');
export const LayoutDashboard = createMaterialIcon('LayoutDashboard');
export const Lock = createMaterialIcon('Lock');
export const LockKeyhole = createMaterialIcon('LockKeyhole');
export const LogOut = createMaterialIcon('LogOut');
export const Mail = createMaterialIcon('Mail');
export const Medal = createMaterialIcon('Medal');
export const Menu = createMaterialIcon('Menu');
export const MessageCircle = createMaterialIcon('MessageCircle');
export const MessageSquare = createMaterialIcon('MessageSquare');
export const Moon = createMaterialIcon('Moon');
export const Newspaper = createMaterialIcon('Newspaper');
export const Play = createMaterialIcon('Play');
export const RotateCcw = createMaterialIcon('RotateCcw');
export const Save = createMaterialIcon('Save');
export const Send = createMaterialIcon('Send');
export const Server = createMaterialIcon('Server');
export const Share2 = createMaterialIcon('Share2');
export const Shield = createMaterialIcon('Shield');
export const ShieldAlert = createMaterialIcon('ShieldAlert');
export const ShieldCheck = createMaterialIcon('ShieldCheck');
export const Sliders = createMaterialIcon('Sliders');
export const SlidersHorizontal = createMaterialIcon('SlidersHorizontal');
export const Sparkles = createMaterialIcon('Sparkles');
export const DirectionsBike = createMaterialIcon('DirectionsBike');
export const SportsBaseball = createMaterialIcon('SportsBaseball');
export const SportsBasketball = createMaterialIcon('SportsBasketball');
export const SportsFootball = createMaterialIcon('SportsFootball');
export const SportsMma = createMaterialIcon('SportsMma');
export const SportsMotorsports = createMaterialIcon('SportsMotorsports');
export const SportsSoccer = createMaterialIcon('SportsSoccer');
export const SportsTennis = createMaterialIcon('SportsTennis');
export const Sun = createMaterialIcon('Sun');
export const Swords = createMaterialIcon('Swords');
export const Target = createMaterialIcon('Target');
export const Trash2 = createMaterialIcon('Trash2');
export const TrendingUp = createMaterialIcon('TrendingUp');
export const Trophy = createMaterialIcon('Trophy');
export const Unlock = createMaterialIcon('Unlock');
export const User = createMaterialIcon('User');
export const UserCheck = createMaterialIcon('UserCheck');
export const Users = createMaterialIcon('Users');
export const Volume2 = createMaterialIcon('Volume2');
export const VolumeX = createMaterialIcon('VolumeX');
export const X = createMaterialIcon('X');
export const Zap = createMaterialIcon('Zap');
