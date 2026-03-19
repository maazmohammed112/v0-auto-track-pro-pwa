# AutoTrackPro User Guide

## Getting Started

### First Steps
1. **Add Your Vehicle**
   - Tap "Add Vehicle" on the My Vehicles page
   - Enter registration number, name, brand, model, year, and fuel type
   - Set current odometer reading
   - Save

2. **Add Expense Logs**
   - Open your vehicle
   - Tap "Add Fuel" or "Add Service" or "Add Charging"
   - Fill in details including odometer reading (important for mileage tracking)
   - Save

3. **Create Reminders**
   - Open your vehicle
   - Tap "Add Reminder"
   - Choose type (Oil Change, Insurance, etc.)
   - Select reminder type: Date-Based or KM-Based
   - Save

## Features Explained

### Insights Page
Shows your vehicle expense and mileage overview:

#### Total Spend
- **Fuel**: Money spent on fuel
- **Service**: Money spent on maintenance
- **Charging**: Money spent on EV charging (if applicable)
- **Timeframe**: Filter by This Week, This Month, or All Time

#### Total Distance
- Sum of all vehicle odometers
- Updated when you add fuel/charging logs with odometer readings

#### Fuel Efficiency (km/L)
- Shows for petrol/diesel vehicles
- Calculated from fuel logs that have odometer readings
- Requires at least 2 fuel logs with odometer values
- Formula: Total km driven ÷ Total litres consumed

#### EV Efficiency (km/charge)
- Shows for electric vehicles
- Calculated from charging logs that have odometer readings
- Requires at least 2 charging logs with odometer values
- Formula: Total km driven ÷ Number of charges

#### Mileage Toggle
- Eye icon in top right toggles mileage data visibility
- Hide sensitive mileage information when needed

### Reminders

#### Date-Based Reminders
1. Choose "Date-Based" option
2. Enter title (e.g., "Oil Change Due")
3. Select due date
4. Add optional notes
5. Tap "Add Reminder"

**Status Indicators**:
- **Overdue**: Red badge - past due date
- **Due Soon**: Shows days remaining (within 7 days)
- **Done**: Green badge - completed

#### KM-Based Reminders (Smart Reminders)
1. Choose "KM-Based" option
2. Enter title (e.g., "Oil Change Due")
3. Enter **distance to add** in km (NOT final mileage)
   - Example: Enter 3000 km, not 48000 km
   - System automatically calculates due mileage
4. App shows:
   - Current odometer: 45,000 km
   - Distance to add: 3,000 km
   - Service due at: 48,000 km
   - Alert triggers at: 47,800 km (200 km before due)
   - Distance remaining: 2,800 km away
5. Tap "Add Reminder"

**Status Updates**:
- Alerts trigger automatically when you drive within 200 km of due mileage
- Alert text updates as you drive: "2000 km away" → "1000 km away" → "Alert triggered"
- Snooze alerts for 12 hours when you see them

### My Vehicles

Each vehicle card shows:
- **Registration Number**: Your vehicle's plate
- **Name**: Your custom name for the vehicle
- **Fuel Type**: Petrol, Diesel, Electric, Hybrid (with badge)
- **Current Odometer**: Latest odometer reading
- **Reminders Badge** (if applicable): Red circle with reminder count

#### Vehicle Details
Tap a vehicle to see:
- **Overview**: Registration, brand, model, year, purchase date
- **Insurance**: Expiry date with color-coded status
- **Logs**: History of fuel, service, and charging entries
- **Reminders**: All reminders for this vehicle
- **Edit/Delete**: Modify or remove vehicle

### Logs

#### Fuel Log
Record: Date, liters, amount (₹), odometer reading, and optional notes
- Odometer reading required for mileage tracking
- Used to calculate fuel efficiency (km/L)

#### Service Log
Record: Date, expense (₹), service type, and optional notes
- Used for maintenance history
- No odometer required

#### Charging Log (EV)
Record: Date, amount (₹), location, and odometer reading
- Odometer required for EV efficiency calculation
- Used to calculate km/charge

## Tips & Tricks

### Maximizing Mileage Tracking
✓ **Always enter odometer readings** when logging fuel/charging
✓ Take photos of odometer for accuracy
✓ Log entries regularly to track trends
✓ Note any long trips in the notes field

### Smart Reminder Usage
✓ Use km-based reminders for mileage-based services
  - Oil changes (every 5000 km)
  - Filter replacements (every 10000 km)
  - Transmission fluid (every 40000 km)
✓ Use date-based reminders for time-based services
  - Insurance (annual renewal)
  - PUC registration (annual/biannual)
  - Vehicle inspection (annual)

### Tracking Multiple Vehicles
✓ Give each vehicle a unique, easy-to-remember name
✓ Use brand and model as distinguishing features
✓ Keep fuel type accurate for proper insights calculation
✓ Set current odometer on first vehicle creation

### Data Organization
✓ Add notes with details: "Premium fuel", "Full service at ABC garage"
✓ Include cost breakdowns for major services
✓ Note dates of significant maintenance events
✓ Keep running list of planned maintenance

## Troubleshooting

### Efficiency Metrics Not Showing
**Problem**: km/L or km/charge not displaying in Insights
**Solution**:
1. Ensure you've added fuel/charging logs with odometer readings
2. At least 2 logs required for calculation
3. Toggle mileage visibility (eye icon) if hidden
4. Verify logs have odometer values filled in

### Reminders Not Updating
**Problem**: Distance to alert not updating as you drive
**Solution**:
1. Refresh the app
2. Add new fuel/charging log to update odometer
3. Check reminder hasn't already been completed
4. Clear app data and reload (last resort)

### Missing Vehicles or Data
**Problem**: Vehicle or log disappeared
**Solution**:
1. Check browser's localStorage hasn't been cleared
2. Ensure you're using same browser/device
3. All data stored locally - check device storage limits
4. Don't clear browser data/cache if using app regularly

### App Not Loading
**Problem**: White screen or slow loading
**Solution**:
1. Refresh the page
2. Clear browser cache
3. Ensure JavaScript is enabled
4. Try different browser
5. Check internet connection

## Data Safety

### Data Storage
- All data stored locally on your device
- No data sent to servers
- Safe for offline use
- Syncs across tabs on same device

### Backup Your Data
Since data is stored locally:
1. Take regular screenshots of important data
2. Export reminders and logs periodically
3. Note down vehicle details in separate document
4. Backup your device regularly

### Clear Data
To reset the app:
1. Open Browser DevTools (F12)
2. Go to Application → Local Storage
3. Find AutoTrackPro entries
4. Clear them
5. Refresh page

## Privacy & Permissions

### What AutoTrackPro Does NOT Do
- ✗ Collect personal data
- ✗ Track your location
- ✗ Access your contacts
- ✗ Upload data to servers
- ✗ Show ads or ads tracking

### What AutoTrackPro DOES
- ✓ Store data locally in your browser
- ✓ Display analytics on your device
- ✓ Send push notifications (with permission)
- ✓ Work offline completely

## Keyboard Shortcuts (Web)
- **Tab**: Navigate between fields
- **Enter**: Submit forms
- **Esc**: Close modals
- **Ctrl/Cmd + S**: Save (not needed, auto-saves)

## Accessibility

### Screen Reader Support
- Full ARIA labels and descriptions
- Semantic HTML structure
- Keyboard navigation fully supported
- High contrast dark mode option

### Mobile Accessibility
- Touch-friendly button sizes (44x44 px minimum)
- Readable text sizes (minimum 16px)
- Clear focus indicators
- Simple, intuitive navigation

## Getting Help

### Common Questions

**Q: Can I sync across devices?**
A: Currently stored locally. Use backup method above for different devices.

**Q: Is my data secure?**
A: Yes, stored locally on your device. Never uploaded to servers.

**Q: Can I export my data?**
A: Current version stores in localStorage. Use DevTools to export JSON.

**Q: Does it work offline?**
A: Yes, fully functional offline. All data stored locally.

**Q: Can I delete a reminder after it's completed?**
A: Yes, tap the reminder and use the delete option.

### Report Issues
- Open browser DevTools (F12)
- Check Console tab for errors
- Note exact steps to reproduce
- Share error messages or screenshots

---

**Version**: 1.0.0
**Last Updated**: March 19, 2026

Happy tracking! 🚗
