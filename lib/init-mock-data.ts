import { getAllUsers, saveUserProfile, generateUserId, generateBadges } from "./storage"

const mockNames = [
  { display: "Sarah Martinez", username: "sarahm" },
  { display: "Michael Chen", username: "mikechen" },
  { display: "Jessica Williams", username: "jessicaw" },
  { display: "David Anderson", username: "davidand" },
  { display: "Emily Johnson", username: "emilyj" },
  { display: "James Rodriguez", username: "jamesr" },
  { display: "Jennifer Garcia", username: "jgarcia" },
  { display: "Robert Taylor", username: "robTaylor" },
  { display: "Linda Hernandez", username: "lindah" },
  { display: "William Moore", username: "willmoore" },
  { display: "Maria Gonzalez", username: "mariag" },
  { display: "Richard Lee", username: "richardl" },
  { display: "Lisa Thompson", username: "lisathompson" },
  { display: "Thomas White", username: "thomasw" },
  { display: "Nancy Miller", username: "nancym" },
  { display: "Daniel Davis", username: "danield" },
  { display: "Karen Wilson", username: "karenw" },
  { display: "Christopher Brown", username: "chrisb" },
  { display: "Betty Martin", username: "bettym" },
  { display: "Matthew Jones", username: "mattjones" },
  { display: "Sandra Clark", username: "sandrac" },
  { display: "Anthony Lewis", username: "anthonyl" },
  { display: "Ashley Walker", username: "ashleyw" },
  { display: "Mark Hall", username: "markh" },
  { display: "Donna Allen", username: "donnaa" },
  { display: "Steven Young", username: "steveny" },
  { display: "Carol King", username: "carolk" },
  { display: "Paul Wright", username: "paulw" },
  { display: "Michelle Scott", username: "michelles" },
  { display: "Andrew Green", username: "andrewg" },
  { display: "Laura Baker", username: "laurab" },
  { display: "Joshua Adams", username: "joshuaa" },
  { display: "Sarah Nelson", username: "sarahnel" },
  { display: "Kevin Carter", username: "kevinc" },
  { display: "Kimberly Mitchell", username: "kimberlym" },
  { display: "Brian Perez", username: "brianp" },
  { display: "Amanda Roberts", username: "amandar" },
  { display: "George Turner", username: "georget" },
  { display: "Melissa Phillips", username: "melissap" },
  { display: "Edward Campbell", username: "edwardc" },
  { display: "Deborah Parker", username: "deborahp" },
  { display: "Ronald Evans", username: "ronalde" },
  { display: "Stephanie Edwards", username: "stephaniee" },
  { display: "Timothy Collins", username: "timothyc" },
  { display: "Rebecca Stewart", username: "rebeccas" },
  { display: "Jason Sanchez", username: "jasons" },
  { display: "Cynthia Morris", username: "cynthiam" },
  { display: "Jeffrey Rogers", username: "jeffreyr" },
  { display: "Kathleen Reed", username: "kathleenr" },
  { display: "Ryan Cook", username: "ryanc" },
]

const bios = [
  "Building the future, one line of code at a time",
  "Designer, developer, and dreamer",
  "Passionate about creating beautiful digital experiences",
  "Tech enthusiast and startup founder",
  "Open source contributor and community builder",
  "AI researcher exploring new possibilities",
  "Full-stack developer with a design mindset",
  "Helping startups scale with technology",
  "Creative technologist and innovator",
  "Building tools that matter",
  "Product designer focused on user experience",
  "Software engineer at a leading tech company",
  "Indie maker building side projects",
  "Digital nomad and remote work advocate",
  "Blockchain enthusiast and crypto builder",
  "Mobile-first developer creating iOS apps",
  "Data scientist turning insights into action",
  "DevOps engineer automating everything",
  "UI/UX designer crafting delightful interfaces",
  "Backend specialist scaling systems",
  "Frontend wizard with React expertise",
  "Machine learning engineer training models",
  "Cloud architect designing infrastructure",
  "Security researcher protecting the web",
  "Game developer creating immersive worlds",
  "API designer building developer tools",
  "Growth hacker and marketing technologist",
  "Technical writer documenting code",
  "Engineering manager leading teams",
  "Startup advisor and angel investor",
  "Code mentor helping others learn",
  "Accessibility advocate making web inclusive",
  "Performance optimizer for fast websites",
  "Test engineer ensuring quality",
  "Systems programmer working close to metal",
  "Web3 developer building dApps",
  "AR/VR creator pushing boundaries",
  "IoT engineer connecting devices",
  "Quantum computing researcher",
  "Bioinformatics developer analyzing genomes",
  "FinTech builder disrupting finance",
  "EdTech innovator transforming education",
  "HealthTech developer improving healthcare",
  "Climate tech engineer saving the planet",
  "Robotics engineer building autonomous systems",
  "Compiler designer optimizing code",
  "Database expert managing data at scale",
  "Network engineer building connectivity",
  "Embedded systems developer",
  "Voice interface designer for AI assistants",
]

const quotes = [
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
]

const interests = [
  ["Design", "Web3", "Startups"],
  ["AI", "Machine Learning", "Data Science"],
  ["React", "Next.js", "TypeScript"],
  ["Product", "UX", "Design Systems"],
  ["DevOps", "Cloud", "Infrastructure"],
  ["Mobile", "iOS", "Flutter"],
  ["Backend", "Databases", "APIs"],
  ["Security", "Privacy", "Blockchain"],
  ["Marketing", "Growth", "Analytics"],
  ["Leadership", "Mentoring", "Community"],
]

const projectTitles = [
  "AI Chat Assistant",
  "Design System",
  "Mobile App",
  "Analytics Dashboard",
  "Open Source Library",
  "SaaS Platform",
  "Browser Extension",
  "CLI Tool",
  "API Gateway",
  "Data Visualization",
]

const projectDescriptions = [
  "A powerful tool for modern developers",
  "Streamline your workflow with automation",
  "Beautiful and intuitive user experience",
  "Built with performance in mind",
  "Open source and community-driven",
  "Enterprise-grade solution",
  "Lightweight and fast",
  "Easy to integrate and use",
  "Scalable architecture",
  "Production-ready",
]

const goalTitles = [
  "Launch SaaS Product",
  "Build Open Source Community",
  "Reach 10k Users",
  "Ship AI Features",
  "Expand to 3 Countries",
  "Raise Series A",
  "Hit 1M Downloads",
  "Build Design System",
  "Create Course",
  "Mentor 10 Developers",
]

const links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "Twitter", url: "https://twitter.com" },
  { title: "Portfolio", url: "https://example.com" },
  { title: "LinkedIn", url: "https://linkedin.com" },
]

const locations = [
  { city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
  { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { city: "Mumbai", country: "India", lat: 19.076, lng: 72.8479 },
  { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { city: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
]

export function initializeMockData() {
  if (typeof window === "undefined") return

  const existingUsers = getAllUsers()
  if (existingUsers.length > 0) return

  const now = Date.now()
  mockNames.forEach((name, index) => {
    const userId = generateUserId()
    const views = Math.floor(Math.random() * 500) + 10
    const upvotes = Math.floor(Math.random() * 100) + 5
    const streak = Math.floor(Math.random() * 30) + 1
    const createdAt = now - Math.random() * 30 * 24 * 60 * 60 * 1000

    const projects = Array.from({ length: 3 }, (_, i) => ({
      id: `project_${userId}_${i}`,
      title: projectTitles[(index * 3 + i) % projectTitles.length],
      description: projectDescriptions[(index * 3 + i) % projectDescriptions.length],
      bannerUrl: `/placeholder.svg?height=160&width=400&query=project${i}`,
      link: `https://example.com/project-${index}-${i}`,
      upvotes: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 200) + 10,
      createdAt: createdAt + i * 7 * 24 * 60 * 60 * 1000,
    }))

    const goal = {
      title: goalTitles[index % goalTitles.length],
      description: `Working towards achieving this goal with dedication and focus`,
      startedAt: createdAt,
      progressPercent: Math.floor(Math.random() * 100),
    }

    const social = {
      x: name.username,
      github: name.username,
      website: `https://${name.username}.com`,
      linkedin: name.username,
    }

    const locationData = locations[index % locations.length]

    const user = {
      id: userId,
      username: name.username,
      displayName: name.display,
      quote: quotes[index % quotes.length],
      bio: bios[index % bios.length],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.username}`,
      social,
      goal,
      projects,
      links: [links[Math.floor(Math.random() * links.length)]],
      interests: interests[index % interests.length],
      views,
      upvotes,
      rank: index + 1,
      createdAt,
      badges: [],
      streak,
      lastActiveDate: now,
      lastSeenDate: new Date(now - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      dailyViews: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(now - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        count: Math.floor(Math.random() * 50),
      })),
      dailyUpvotes: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(now - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
      })),
      schemaVersion: 3,
      location: locationData,
    }

    user.badges = generateBadges(user)
    saveUserProfile(user)
  })
}
