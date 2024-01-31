"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { useState, useEffect } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area"


interface Country {
  name: string;
  dialCode: string;
  unicodeFlag: string;
}

export function CountrySelect({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(value);
  const [displayed, setDisplayed] = useState('Select country');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/countries", {
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
          // Sort the countries based on the name property
          const sortedCountries =  data.data.sort((a: Country, b: Country) =>
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


  const handleSelect = (currentValue: string[]) => {
    setSelectedCountry(currentValue[0]);
    setDisplayed(`${currentValue[0]} ${String.fromCharCode(160)} ${currentValue[1]}`);
    setOpen(false);
    onChange(currentValue[0]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="combobox" role="combobox" aria-expanded={open} className="w-full justify-between">
          {displayed ? displayed : "Select country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] overflow-y-auto p-0">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries?.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={() => handleSelect([country.name, country.unicodeFlag])}
                >
                  <Check
                    className={cn(
                      "h-4 w-6",
                      displayed === selectedCountry  ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span role="img" aria-label="flag">
                  {country.unicodeFlag}
                </span>
                &nbsp; &nbsp;{country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

