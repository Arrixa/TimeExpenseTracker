import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  Settings,
  Settings2,
  User,
  Users,
  CalendarClock,
  Timer,
  WalletCards,
} from "lucide-react";

  // FTM-2 / FTM-20 21. Sidebar icons

const IconRenderer = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'Admin':
      return <LayoutDashboard className="h-5 w-5 ml-4" />;
    case 'Time tracker':
      return <Timer className="h-5 w-5 ml-4" />;
    case 'Time sheet':
      return <CalendarClock className="h-5 w-5 ml-4" />; 
    case 'Expense tracker':
      return <Briefcase className="h-5 w-5 ml-4" />; 
    case 'Users':
      return <Users className="h-5 w-5 ml-4" />;
    case 'Inbox':
      return <Inbox className="h-5 w-5 ml-4" />;
    case 'Preferences':
      return <Settings2 className="h-5 w-5 ml-4" />;
    case 'Settings':
      return <Settings className="h-5 w-5 ml-4" />;
    default:
      return null;
  }
};

export default IconRenderer;
