import { IconSearch, IconX } from "@tabler/icons-react";
import { useState, useEffect, useCallback } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "./button";
import { Input } from "./input";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounced?: boolean;
  debounceTime?: number;
}

export function SearchInput({
  onSearch,
  placeholder = "Search",
  className,
  debounced = true,
  debounceTime = 500,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedOnSearch = useDebounceCallback(onSearch, debounceTime);

  const handleSearch = useCallback(
    (value: string) => {
      if (debounced) {
        debouncedOnSearch(value);
      } else {
        onSearch(value);
      }
    },
    [debounced, debouncedOnSearch, onSearch],
  );

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue, handleSearch]);

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        className="pl-9"
        autoFocus
        value={searchValue}
        placeholder={placeholder}
        name="search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IconSearch className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
      {searchValue && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50"
          onClick={handleClear}
        >
          <IconX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
