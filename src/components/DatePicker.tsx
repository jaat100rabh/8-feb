import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";

interface DatePickerProps {
  onDateSelect: (date: string) => void;
  isVisible: boolean;
  onNeverSelect: () => void;
}

const DatePicker = ({ onDateSelect, isVisible, onNeverSelect }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Generate dates from 7 Feb 2026 to 8 Feb 2026
  const generateDates = () => {
    const dates = [];
    const startDate = new Date(2026, 1, 7); // February 7, 2026
    const endDate = new Date(2026, 1, 8); // February 8, 2026
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const dates = generateDates();
  const months = ['February'];

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
        className="bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-200 p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-rose-600" />
          <h3 className="font-romantic text-xl text-rose-800">Choose a Date</h3>
        </div>

        {/* Calendar Grid */}
        <div className="max-h-64 overflow-y-auto">
          <div className="space-y-4">
            {months.map((month, monthIndex) => {
              const monthDates = dates.filter(date => 
                date.getMonth() === 1 // February (month index 1)
              );
              
              if (monthDates.length === 0) return null;
              
              return (
                <div key={month}>
                  <h4 className="font-semibold text-rose-700 mb-2">{month} 2026</h4>
                  <div className="grid grid-cols-7 gap-1">
                    {monthDates.map((date, index) => (
                      <Button
                        key={index}
                        onClick={() => handleDateClick(date)}
                        size="sm"
                        variant="outline"
                        className={`text-xs h-8 w-8 p-0 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300 ${
                          selectedDate === date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'border-rose-200'
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
            className="mt-4 p-3 bg-white/50 rounded-lg border border-rose-200"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600" />
              <p className="font-elegant text-sm text-rose-800">
                Selected: {selectedDate}
              </p>
            </div>
          </motion.div>
        )}

        {/* Never Option */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <Button
            onClick={onNeverSelect}
            variant="outline"
            className="w-full border-2 border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400 transition-all duration-300 group"
          >
            <X className="w-4 h-4 text-red-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-elegant text-red-700">Never</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DatePicker;
