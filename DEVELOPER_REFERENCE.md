# AutoTrackPro Developer Reference

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
autotrackpro/
├── app/
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Home page with schema.org
│   └── globals.css          # Global styles and theme
├── components/
│   ├── AppShell.tsx         # Main app shell
│   ├── HomePage.tsx         # Home/vehicles page
│   ├── InsightsPage.tsx     # Analytics/insights
│   ├── MileageInsightsSection.tsx  # NEW: Distance & efficiency metrics
│   ├── ReminderForm.tsx     # Add/edit reminders (IMPROVED)
│   ├── VehicleDetail.tsx    # Vehicle details page
│   ├── FuelLogForm.tsx      # Fuel entry form
│   ├── ServiceLogForm.tsx   # Service entry form
│   ├── ChargingLogForm.tsx  # EV charging form
│   └── ...other components
├── lib/
│   ├── context.tsx          # App state management
│   ├── store.ts             # Data operations & calculations
│   └── schema.ts            # SEO schema.org definitions
├── public/
│   ├── robots.txt           # Search engine crawl rules
│   ├── sitemap.xml          # URL index for crawlers
│   ├── manifest.json        # PWA configuration
│   ├── favicon.ico          # App icon
│   └── ...other assets
├── next.config.mjs          # Next.js configuration (ENHANCED)
├── vercel.json              # Vercel deployment config (NEW)
├── tsconfig.json            # TypeScript configuration
├── PRODUCTION.md            # Deployment guide (NEW)
├── DEPLOYMENT_CHECKLIST.md  # Pre-launch checklist (NEW)
├── FIXES_SUMMARY.md         # List of all fixes (NEW)
└── USER_GUIDE.md            # User documentation (NEW)
```

## Key Components

### AppShell Component
Main app container that manages:
- Navigation between pages (Home, Insights, Settings)
- Vehicle selection
- Modal management
- Data synchronization

### ReminderForm Component (IMPROVED)
Enhanced to simplify km-based reminders:
- `distanceToAdd` state: User enters distance (e.g., 3000 km)
- Auto-calculates: Due mileage = currentOdometer + distance
- Smart preview showing calculations in real-time
- Validation for positive distances

### MileageInsightsSection Component (NEW)
Displays vehicle efficiency metrics:
- Total distance: Sum of all vehicle odometers
- Per-vehicle breakdown with efficiency calculations
- km/L for fuel vehicles, km/charge for EVs
- Only shows metrics when logs with odometer readings exist

## Data Flow

### State Management
Uses React Context (lib/context.tsx) for:
- Vehicle data
- Fuel logs
- Service logs
- Charging logs
- Reminders
- User preferences (mileage tracking toggle)

### Data Storage
LocalStorage JSON structure:
```typescript
{
  version: 1,
  vehicles: Vehicle[],
  fuelLogs: FuelLog[],
  chargingLogs: ChargingLog[],
  serviceLogs: ServiceLog[],
  reminders: Reminder[],
  mileageTrackingEnabled: boolean,
}
```

### Key Types (lib/store.ts)
```typescript
interface Vehicle {
  id: string
  registrationNumber: string
  name: string
  brand: string
  model: string
  year: number
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  currentOdometer: number
  purchaseDate: string
  insuranceExpiry: string
}

interface Reminder {
  id: string
  vehicleId: string
  type: ReminderType
  title: string
  dueDate: string
  dueMileage?: number
  isMileageBased: boolean
  notes?: string
  isCompleted: boolean
  lastSnoozedAt?: string
}

interface FuelLog {
  id: string
  vehicleId: string
  date: string
  litres: number
  amount: number
  odometer?: number
  notes?: string
}
```

## Important Functions

### lib/store.ts

#### `isSmartReminderDue(reminder: Reminder, currentOdometer: number): boolean`
- Returns true when odometer >= (dueMileage - 200) && odometer < dueMileage
- Used to determine if alert should be shown

#### `getTotalDistanceDriven(vehicles: Vehicle[], fuelLogs: FuelLog[], chargingLogs: ChargingLog[]): number`
- Calculates total distance from fuel logs with odometer readings
- Returns sum of all distance increments between log entries

#### `calculateKmPerLiter(vehicleId: string, fuelLogs: FuelLog[]): number | null`
- Requires 2+ fuel logs with odometer readings
- Formula: totalKm ÷ totalLitres
- Returns null if insufficient data

#### `calculateKmPerCharge(vehicleId: string, chargingLogs: ChargingLog[]): number | null`
- Requires 2+ charging logs with odometer readings
- Formula: totalKm ÷ numberOfCharges
- Returns null if insufficient data

## Component Communication

### ReminderForm Props
```typescript
interface ReminderFormProps {
  vehicleId: string
  onClose: () => void
  editReminder?: Reminder
}
```

### MileageInsightsSection Integration
Used in InsightsPage:
- Receives mileageTrackingEnabled from context
- Calculates distance and efficiency metrics
- Renders cards with visual hierarchy

## Testing Checklist

### Unit Tests
- [ ] Reminder due date calculation
- [ ] Reminder mileage calculation
- [ ] Fuel efficiency (km/L) calculation
- [ ] EV efficiency (km/charge) calculation
- [ ] Form validation
- [ ] Data persistence

### Component Tests
- [ ] ReminderForm rendering and submission
- [ ] MileageInsightsSection display logic
- [ ] HomePage vehicle list and filters
- [ ] InsightsPage timeframe filtering
- [ ] Modal open/close behavior

### Integration Tests
- [ ] Add vehicle → Create reminder → Log fuel → Verify calculations
- [ ] Edit reminder → Verify updated display
- [ ] Delete log → Verify efficiency recalculation
- [ ] Toggle mileage tracking → Verify visibility

### E2E Tests
- [ ] Complete user workflow: Add vehicle, logs, reminders
- [ ] Mobile responsiveness on various screen sizes
- [ ] PWA installation and offline functionality
- [ ] Data persistence across sessions

## Performance Optimization

### Current Optimizations
- Code splitting via dynamic imports
- Memoization with useMemo in calculations
- Lazy loading modals
- Optimized re-renders with React.memo

### Potential Improvements
- Virtual scrolling for large lists
- Debouncing for search/filter
- Service Worker for offline caching
- IndexedDB for larger datasets

## SEO Implementation

### Metadata (app/layout.tsx)
- Title with primary keyword
- Meta description with features
- OpenGraph for social sharing
- Twitter Card for tweets
- Robots configuration

### Structured Data (lib/schema.ts)
- Schema.org SoftwareApplication
- Organization schema
- Structured data markup in JSON-LD format
- Added to page.tsx via script tag

### Technical SEO
- robots.txt at /robots.txt
- sitemap.xml at /sitemap.xml
- Responsive design (mobile-first)
- Fast page load (Core Web Vitals)
- Security headers (HTTPS, CSP, etc.)

## Security Considerations

### Current Implementation
- Client-side only (no backend)
- No external API calls for data
- Local storage for persistence
- No sensitive data transmission

### Best Practices Applied
- CSP headers via next.config.mjs
- X-Frame-Options to prevent clickjacking
- X-XSS-Protection enabled
- Referrer-Policy configured
- Permissions-Policy restricted

### Future Security (if backend added)
- HTTPS only communication
- Input sanitization on backend
- Rate limiting on API endpoints
- JWT authentication
- Database encryption

## Debugging Tips

### Browser DevTools
```javascript
// Check LocalStorage
localStorage.getItem('autotrackpro')

// Check state in Context
// Add console.log in useApp hook

// Check Component Props
// React DevTools extension
```

### Common Issues

**Reminders not updating:**
- Clear LocalStorage: `localStorage.clear()`
- Verify odometer is being updated with fuel logs
- Check reminder.isMileageBased is true

**Efficiency not calculating:**
- Ensure 2+ logs with odometer readings
- Verify odometer values are increasing
- Check fuel log has litres and odometer

**Data not persisting:**
- Check browser's Storage settings
- Verify localStorage is not disabled
- Check for storage quota limits
- Try private/incognito mode

## Deployment Checklist (Developer)

- [ ] All types properly defined (no `any`)
- [ ] No console.log in production code
- [ ] Error boundaries implemented
- [ ] Form validation complete
- [ ] Error handling for edge cases
- [ ] No hardcoded secrets or API keys
- [ ] Build passes without errors
- [ ] Bundle size acceptable
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing

## Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React hooks conventions
- Memoize expensive calculations
- Use meaningful variable names
- Add comments for complex logic

### Component Structure
```typescript
'use client'

import { useState } from 'react'
import { useApp } from '@/lib/context'

interface ComponentProps {
  // Props definition
}

export function MyComponent({ prop1, prop2 }: ComponentProps) {
  // State
  const [state, setState] = useState('')
  
  // Context
  const { data } = useApp()
  
  // Handlers
  function handleClick() {
    // Logic
  }
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Git Workflow
1. Create feature branch: `git checkout -b feature/description`
2. Make changes and test thoroughly
3. Commit with clear messages: `git commit -m "Fix: distance calculation"`
4. Push to branch: `git push origin feature/description`
5. Create pull request with detailed description

## Resources

### Documentation
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

### Tools
- React DevTools: Browser extension for debugging
- Redux DevTools: State management visualization
- Lighthouse: Performance auditing
- PageSpeed Insights: Performance metrics

---

**Version**: 1.0.0
**Last Updated**: March 19, 2026

For detailed feature documentation, see README.md
For user guide, see USER_GUIDE.md
For production deployment, see PRODUCTION.md
