'use client';

import { Download, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SuccessActionsProps {
  bookingCode: string;
}

export default function SuccessActions({ bookingCode }: SuccessActionsProps) {
  const t = useTranslations('pages.success');

  const handleDownloadPDF = () => {
    // Use browser print as PDF - cleanest approach without server-side PDF generation
    window.print();
  };

  const handleAddToCalendar = () => {
    // Generate a basic .ics file
    // Use a date 7 days from now as placeholder since we don't have the actual tour date
    const tourDate = new Date();
    tourDate.setDate(tourDate.getDate() + 7);
    tourDate.setHours(8, 0, 0, 0);
    
    const endDate = new Date(tourDate);
    endDate.setHours(18, 0, 0, 0);

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Machu Picchu Travel//Tours//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(tourDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${t('calendarEvent.summary', { code: bookingCode })}`,
      `DESCRIPTION:${t('calendarEvent.description', { code: bookingCode }).replace(/\n/g, '\\\\n')}`,
      `LOCATION:${t('calendarEvent.location')}`,
      `UID:${bookingCode}@machupicchutravel.com`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      `DESCRIPTION:${t('calendarEvent.reminder')}`,
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${bookingCode}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 sm:mt-0 flex space-x-3">
      <button
        onClick={handleDownloadPDF}
        className="flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors"
      >
        <Download className="w-4 h-4 mr-1" /> {t('downloadPDF')}
      </button>
      <button
        onClick={handleAddToCalendar}
        className="flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors"
      >
        <Calendar className="w-4 h-4 mr-1" /> {t('addToCalendar')}
      </button>
    </div>
  );
}
