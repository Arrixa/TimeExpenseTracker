import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  Settings,
  Settings2,
  User,
  Users,
} from "lucide-react";

  // FTM-2 / FTM-20 21. Sidebar icons

const IconRenderer = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case 'Profile':
      return <User className="h-5 w-5 ml-4" />;
    case 'Admin dashboard':
      return <LayoutDashboard className="h-5 w-5 ml-4" />;
    case 'Recruitment':
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
