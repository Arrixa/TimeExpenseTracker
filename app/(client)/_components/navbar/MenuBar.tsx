'use client'
import { useState } from 'react';
import { Search } from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';
import HelpDrawer from './HelpDrawer';
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"

// FTM-2 / FTM-20 26. Client navbar

const MenuBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search submission logic here
  };

  return (
    <nav className="fixed top-0 flex justify-end items-center mb-2 p-2 space-x-2 bg-secondary w-full">
      {isSearchOpen ? (
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <Input type="search" placeholder="Search FlairNow..." onBlur={closeSearch} autoFocus />
          <Button variant='link' type="submit"><Search size={24} /></Button>
        </form>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant='link' onClick={openSearch}><Search size={24} /></Button>
          <Button variant='link'><NotificationDrawer /></Button>
          <Button variant='link'><HelpDrawer /></Button>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
