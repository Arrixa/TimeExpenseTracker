export const sidebarItems = [
  { role: "ADMIN", label: "Admin", href: "/dashboard/admin" },
  { role: "EMPLOYEE", label: "Time tracker", href: "/dashboard/time" },
  { role: "EMPLOYEE", label: "Time off", href: "/dashboard/time-off" },
  { role: "EMPLOYEE", label: "Time report", href: "/dashboard/time-report" },
  { role: "EMPLOYEE", label: "Expense tracker", href: "/dashboard/expense" },
  { role: "EMPLOYEE", label: "Inbox", href: "#" },
  { role: "ADMIN", label: "Users", href: "#" },
  { role: "EMPLOYEE", label: "Preferences", href: "#" },
  { role: "EMPLOYEE", label: "Settings", href: "#" },
];

export const newSidebarItems = [
  {
    role: "ADMIN",
    menuItems: [
      { label: "Admin", href: "/dashboard/admin" },
      { label: "Users", href: "#" },
      { label: "Time tracker", href: "/dashboard/time" },
      { label: "Time off", href: "/dashboard/time-off" },
      { label: "Time report", href: "/dashboard/time-report" },
      { label: "Expense tracker", href: "/dashboard/expense" },
      { label: "Inbox", href: "#" },
      { label: "Preferences", href: "#" },
      { label: "Settings", href: "#" },
    ],
  },
  {
    role: "EMPLOYEE",
    menuItems: [
      { label: "Time tracker", href: "/dashboard/time" },
      { label: "Time off", href: "/dashboard/time-off" },
      { label: "Time report", href: "/dashboard/time-report" },
      { label: "Expense tracker", href: "/dashboard/expense" },
      { label: "Inbox", href: "#" },
      { label: "Preferences", href: "#" },
      { label: "Settings", href: "#" },
    ],
  },
];
