# Brillance Leaderboard - Advanced Social Platform

A fully-featured leaderboard and portfolio platform built with Next.js, React, and Tailwind CSS. Users can create profiles, showcase projects, earn badges, and compete on dynamic leaderboards.

## Features

### Core Features
- **User Profiles** - Create profiles with display name, bio, quote, avatar, and social links
- **Leaderboard** - Real-time ranking with multiple sorting options (Today, Yesterday, All-Time, Newcomers)
- **Projects** - Add, edit, and delete projects with banners, descriptions, and external links
- **Upvotes** - Heart-based upvote system with confetti animations and duplicate prevention
- **Goals** - Set and track personal goals with progress bars
- **Analytics Dashboard** - Track views, upvotes, engagement, and project performance
- **Hall of Fame** - Museum-style gallery of all profiles with infinite scrolling
- **Badges** - Earn achievement badges based on views, upvotes, streaks, and projects

### Advanced Features
- **Weighted Ranking Algorithm** - 40% upvotes + 30% views + 20% streak + 10% project count
- **Streak Tracking** - Automatic daily streak calculation with badge rewards
- **Social Integration** - Link Twitter, GitHub, LinkedIn, and personal website
- **Project Analytics** - Per-project view/upvote tracking and CTR calculation
- **Engagement Charts** - Daily engagement visualization with Recharts
- **Micro Interactions** - Confetti bursts, smooth animations, hover effects
- **localStorage Persistence** - All data stored locally with schema versioning

## Getting Started

### Installation

\`\`\`bash
# Clone or download the project
cd brillance-leaderboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### First Time Setup

1. **Create Account** - Click "Create Profile" on landing page
2. **Complete Profile** - Fill out 8-step wizard (name, avatar, quote, bio, social, goal, links, interests)
3. **Add Projects** - Go to your profile and click "Add Project"
4. **Explore** - Visit leaderboard, view other profiles, upvote projects

### Developer Tools

Access `/dev-tools` for testing utilities:
- **Seed Mock Data** - Generate 15 test profiles with 3 projects each
- **Simulate Traffic** - Generate 100 random view/upvote events
- **Reset All Data** - Clear all localStorage data
- **Schema Inspector** - View current data structure

## Data Schema

### User Profile
\`\`\`typescript
interface UserProfile {
  id: string                                    // Unique user ID
  username: string                              // Login username
  displayName: string                           // Public display name
  quote?: string                                // Personal quote/motto
  bio: string                                   // User biography
  avatar: string                                // Avatar URL
  social: {                                     // Social media links
    x?: string                                  // Twitter handle
    github?: string                             // GitHub username
    website?: string                            // Personal website
    linkedin?: string                           // LinkedIn username
  }
  goal?: {                                      // Current goal
    title: string
    description: string
    startedAt: number
    progressPercent: number
  }
  projects: Project[]                           // User's projects
  links: { title: string; url: string }[]      // Custom links
  interests: string[]                           // User interests
  views: number                                 // Total profile views
  upvotes: number                               // Total upvotes received
  rank: number                                  // Current rank
  createdAt: number                             // Account creation timestamp
  badges: string[]                              // Earned badges
  streak: number                                // Current streak days
  lastActiveDate: number                        // Last activity timestamp
  lastSeenDate: string                          // Last day in leaderboard (YYYY-MM-DD)
  dailyViews: { date: string; count: number }[] // Daily view history
  dailyUpvotes: { date: string; count: number }[] // Daily upvote history
  schemaVersion: number                         // Data schema version
}
\`\`\`

### Project
\`\`\`typescript
interface Project {
  id: string                                    // Unique project ID
  title: string                                 // Project title
  description: string                           // Project description
  bannerUrl?: string                            // Banner image URL
  link?: string                                 // External project link
  upvotes: number                               // Project upvotes
  views: number                                 // Project views
  createdAt: number                             // Creation timestamp
}
\`\`\`

## Ranking Algorithm

### Formula
\`\`\`
score = 0.4 * normalized(upvotes) 
      + 0.3 * normalized(views) 
      + 0.2 * normalized(streak) 
      + 0.1 * normalized(project_count)
\`\`\`

### Normalization Process
1. Filter users by timeframe (today/yesterday/all-time/newcomers)
2. Calculate raw score for each user
3. Find min/max scores in filtered set
4. Normalize: `(score - min) / (max - min)` → [0, 1]
5. Sort by normalized score (highest first)
6. Assign ranks 1, 2, 3, ...

### Edge Cases
- **No profiles**: Shows placeholder
- **Single profile**: Normalization returns 0.5
- **Zero range**: All scores normalize to 0.5 (equal ranking)

## Badge System

### Tier Badges (by upvotes)
- **Bronze** - 10+ upvotes
- **Silver** - 50+ upvotes
- **Gold** - 200+ upvotes
- **Diamond** - 10,000+ upvotes

### Achievement Badges
- **Popular** - 100+ views
- **Trending** - 500+ views
- **Viral** - 2,000+ views
- **Consistent** - 3+ day streak
- **Dedicated** - 7+ day streak
- **Unstoppable** - 30+ day streak
- **Builder** - 3+ projects
- **Prolific** - 10+ projects

## Analytics Dashboard

### Overview Tab
- Total views and upvotes
- Weekly statistics
- 14-day view/upvote charts
- Badge collection

### Projects Tab
- Project performance table
- Sorted by upvotes/views
- Click-through rate (CTR) calculation
- Views and upvotes per project

### Engagement Tab
- Daily engagement line chart
- Top performing day stats
- Overall engagement rate
- Upvotes per view metric

## Upvote System

### How It Works
1. Click heart icon on profile, project, or leaderboard row
2. Upvote recorded with visitor ID to prevent duplicates
3. Confetti animation plays on success
4. User's upvote count increments instantly
5. Ranking recalculates in real-time

### Duplicate Prevention
- Each visitor can upvote each profile/project once
- Tracked in localStorage with key: `{userId}-{visitorId}`
- Prevents accidental or malicious duplicate votes

## Project Management

### Adding Projects
1. Go to your profile
2. Click "Add Project" button
3. Fill in title, description, banner URL, and external link
4. Click "Add Project"

### Editing Projects
1. Go to your profile
2. Click edit icon on project card
3. Update fields and click "Update Project"

### Deleting Projects
1. Go to your profile
2. Click delete icon on project card
3. Confirm deletion

## Social Features

### Social Links
- Add Twitter, GitHub, LinkedIn, and personal website
- Icons appear on profile page
- Links open in new tab

### Featured Builders
- 3 random profiles featured daily on leaderboard
- Deterministic selection (same 3 for all users per day)
- Changes after midnight

### Hall of Fame
- Museum-style grid of all profiles
- Hover to reveal profile info
- Infinite scrolling layout
- Click to view full profile

## Testing Checklist

- [ ] Create profile → appears in Leaderboard/Newcomers
- [ ] Click profile → views increment
- [ ] Upvote profile → ranking updates
- [ ] Featured 3 show on leaderboard top
- [ ] Featured same for all users per day
- [ ] Badges awarded per thresholds
- [ ] Streak increments on consecutive days
- [ ] Analytics dashboard shows charts
- [ ] Hall of Fame displays all profiles
- [ ] Projects show upvotes and views
- [ ] Social links open correctly
- [ ] Mobile responsive (320px+)
- [ ] Dev tools reset/seed works
- [ ] Traffic simulation updates rankings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Storage**: ~50KB per 15 profiles
- **Load Time**: <1s on modern devices
- **Animations**: 60fps with GPU acceleration
- **Responsive**: Mobile-first design (320px+)

## Troubleshooting

### Data Not Persisting
- Check browser localStorage is enabled
- Clear cache and reload
- Use `/dev-tools` to reset and reseed data

### Upvotes Not Working
- Ensure you're logged in
- Check browser console for errors
- Try upvoting a different profile

### Rankings Not Updating
- Refresh the page
- Check that profiles have views/upvotes
- Use `/dev-tools` to simulate traffic

## Future Enhancements

- [ ] User authentication with passwords
- [ ] Email verification
- [ ] Comments and discussions
- [ ] Follow/unfollow system
- [ ] Notifications
- [ ] Search and filtering
- [ ] Dark mode
- [ ] Export profile as PDF
- [ ] API for third-party integrations
- [ ] Real-time updates with WebSockets

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, check the `/dev-tools` page or review the schema inspector to debug data issues.
