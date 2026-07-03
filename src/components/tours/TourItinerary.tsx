import { ChevronDown } from 'lucide-react';

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface TourItineraryProps {
  items: ItineraryItem[];
}

export default function TourItinerary({ items }: TourItineraryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-10 shadow-sm border border-gray-100 mt-8">
      <h2 className="font-serif text-3xl text-primary-dark mb-6">Itinerario</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.day} className="group border border-gray-100 rounded-xl overflow-hidden">
            <summary className="flex items-center gap-4 p-4 cursor-pointer hover:bg-accent transition-colors list-none">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                D{item.day}
              </span>
              <span className="font-bold text-text-main flex-1">{item.title}</span>
              <ChevronDown className="w-5 h-5 text-text-light transition-transform group-open:rotate-180 shrink-0" />
            </summary>
            <div className="px-4 pb-4 pl-[3.5rem] text-text-light text-sm leading-relaxed">
              {item.description}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
