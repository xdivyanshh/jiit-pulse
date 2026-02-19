export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  
  if (Notification.permission === 'granted') return true;
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const sendClassNotification = (className, startTime, venue) => {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    // Check if we already notified for this class recently to avoid spam
    const lastNotifiedKey = `last_notified_${className}_${startTime}`;
    const lastNotified = sessionStorage.getItem(lastNotifiedKey);
    const now = Date.now();

    if (!lastNotified || now - parseInt(lastNotified) > 30 * 60 * 1000) { // 30 mins cooldown
      try {
        new Notification(`Class Starting Soon: ${className}`, {
          body: `Time: ${startTime} | Venue: ${venue}`,
          icon: '/icon.png', // Ensure you have an icon or remove this line
          tag: 'class-notification'
        });
        sessionStorage.setItem(lastNotifiedKey, now.toString());
      } catch (e) {
        console.error("Notification error", e);
      }
    }
  }
};

// Helper to parse time string "10:00 AM" to minutes from midnight
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

export const checkScheduleAndNotify = (profile, scheduleData) => {
  if (!profile || !scheduleData) return;

  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[now.getDay()];
  
  // Construct the key to look up in scheduleData (e.g., btech-128_sem2_phase1_f6)
  // This logic depends on how your data is structured. 
  // Assuming a simplified lookup or iterating through available batches if exact key isn't known.
  // For this example, we'll try to find the batch in the data.
  
  let userClasses = [];
  
  // Try to find the specific batch data
  // This is a heuristic based on the classes.json structure provided
  const batchKeyPart = `_${profile.batch.toLowerCase()}`;
  
  Object.keys(scheduleData).forEach(key => {
    if (key.toLowerCase().includes(batchKeyPart) && key.toLowerCase().includes(profile.campus)) {
       const batchData = scheduleData[key];
       if (batchData && batchData.classes && batchData.classes[currentDay]) {
         userClasses = batchData.classes[currentDay];
       }
    }
  });

  if (!userClasses || userClasses.length === 0) return;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  userClasses.forEach(cls => {
    const classStartMinutes = parseTime(cls.start);
    const timeDiff = classStartMinutes - currentMinutes;

    // Notify if class starts in 10 minutes or less (and hasn't started yet)
    if (timeDiff > 0 && timeDiff <= 10) {
      sendClassNotification(cls.subject, cls.start, cls.venue);
    }
  });
};