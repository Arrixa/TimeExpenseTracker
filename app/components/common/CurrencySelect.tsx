import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { ChevronsUpDown, Search } from "lucide-react"
import { Country, CommandInputProps, CodeSelectProps } from "@/lib/interfaces";

const CustomCommandInput: React.FC<CommandInputProps> = ({ placeholder, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    className="flex h-11 w-full rounded-md bg-background py-3 text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
  />
);

export function CurrencySelect({ onChange, value }: CodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(value);
  const [displayed, setDisplayed] = useState('');
  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/countries', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.error) {
          // Filter out countries with no currency
          const filteredCountries = data.data.filter((country: Country) => country.currency);
          // Sort the countries based on the name property
          const sortedCountries = filteredCountries.sort((a: Country, b: Country) =>
            a.name.localeCompare(b.name)
          );
          setCountries(sortedCountries);
        } else {
          console.error("Error fetching country data:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase()) ||
    country.currency.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setSelectedCurrency(country.currency);
    setDisplayed(`${country.unicodeFlag} \u00A0 ${country.currency}`);
    setOpen(false);
    onChange(country.currency);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="combobox" role="combobox" aria-expanded={open} className="justify-between text-foreground bg-background">
          {displayed ? displayed : "Select Currency"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 bg-background">
          <Command>
            <div className="flex items-center border-b px-3 bg-background" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 bg-background" />
              <CustomCommandInput
                placeholder="Search currency..."
                onChange={(e) => setSearchText(e.target.value)}
              />
              <CommandEmpty>No currency found.</CommandEmpty>
            </div>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.currency}
                  onSelect={() => handleSelect(country)}
                >
                  <span role="img" aria-label="flag">
                    {country.unicodeFlag}
                  </span>
                  &nbsp; &nbsp;{country.currency}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
