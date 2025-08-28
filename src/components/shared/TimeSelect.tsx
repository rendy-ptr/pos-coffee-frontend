import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';

interface TimeSelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: number; // interval menit, default 15
}

export function TimeSelect({
  value,
  onChange,
  placeholder = 'Pilih Jam',
  step = 15,
}: TimeSelectProps) {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += step) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-full justify-between rounded-xl border-2 border-[#e6d9c9]/50 bg-white/80 text-base shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#6f4e37]" />
            {value || placeholder}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 rounded-xl border border-[#e6d9c9]/50 bg-white p-0 shadow-md">
        <Command>
          <CommandInput placeholder="Cari jam..." className="h-9" />
          <CommandEmpty>Tidak ada jam</CommandEmpty>
          <ScrollArea className="h-64">
            <CommandGroup>
              {times.map(t => (
                <CommandItem
                  key={t}
                  onSelect={() => onChange(t)}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-[#f5f0eb]"
                >
                  {t}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
