import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface NewDatePickerProps {
  isVisible: boolean;
  onDateSelect: (date: string) => void;
}

const NewDatePicker = ({ isVisible, onDateSelect }: NewDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate dates from 15 June 2026 to 31 December 2026
  const generateDates = () => {
    const dates = [];
    const startDate = new Date(2026, 5, 15); // June 15, 2026
    const endDate = new Date(2026, 11, 31); // December 31, 2026
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const dates = generateDates();
  const months = [
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateClick = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 w-full max-w-md mx-auto"
    >
      {/* Calendar Box */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200 p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-romantic text-xl text-blue-800">Choose a Date</h3>
        </div>

        {/* Calendar Grid */}
        <div className="max-h-64 overflow-y-auto">
          <div className="space-y-4">
            {months.map((month, monthIndex) => {
              const monthDates = dates.filter(date => 
                date.getMonth() === monthIndex + 5 // June = 5, so +5 for correct index
              );
              
              if (monthDates.length === 0) return null;
              
              return (
                <div key={month}>
                  <h4 className="font-semibold text-blue-700 mb-2">{month} 2026</h4>
                  <div className="grid grid-cols-7 gap-1">
                    {monthDates.map((date, index) => (
                      <Button
                        key={index}
                        onClick={() => handleDateClick(date)}
                        size="sm"
                        variant="outline"
                        className={`text-xs h-8 w-8 p-0 transition-all duration-200 hover:bg-blue-100 hover:border-blue-300 ${
                          selectedDate === date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'border-blue-200'
                        }`}
                      >
                        {date.getDate()}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <p className="font-elegant text-sm text-blue-800">
                Selected: {selectedDate}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NewDatePicker;
