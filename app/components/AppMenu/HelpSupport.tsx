import React, { useMemo } from 'react';
import { 
  MdHelp, 
  MdEmail,
  MdChat,
  MdBugReport,
  MdFeedback,
  MdVideoLibrary,
  MdMenuBook,
  MdInfo,
  MdChevronRight
} from 'react-icons/md';
import HelpFAQ from './HelpFAQ';

export default function HelpSupport() {

  // Memoize static data to prevent re-creation on every render
  const faqData = useMemo(() => [
    {
      question: "How do I start my first workout?",
      answer: "Simply browse through our workout collection on the home page, select a workout that matches your fitness level, and tap 'Start Workout'. The app will guide you through each step with voice prompts and visual cues."
    },
    {
      question: "Can I use my own music during workouts?",
      answer: "Yes! Running Buddy integrates with Spotify Premium. Connect your Spotify account in Settings > Music to play your favorite playlists during workouts. The app will lower music volume for voice coaching prompts."
    },
    {
      question: "How do I track my progress over time?",
      answer: "Visit the Progress & Stats section from the app menu to see detailed analytics, personal bests, weekly activity charts, and goal tracking. All your completed workouts are automatically recorded."
    },
    {
      question: "What if I can't complete a workout?",
      answer: "No worries! You can pause, modify, or stop any workout at any time. The app will save your progress and suggest easier alternatives. Remember, it's better to build consistency than to push too hard too fast."
    },
    {
      question: "How do workout difficulty levels work?",
      answer: "Level 1 (Beginner): Perfect for new runners\nLevel 2 (Intermediate): Some running experience\nLevel 3 (Advanced): Regular runner\nLevel 4 (Expert): Experienced athlete\n\nStart with a level that feels comfortable and gradually progress."
    },
    {
      question: "Can I create custom workouts?",
      answer: "Currently, we offer 20+ professionally designed workouts. Custom workout creation is planned for a future update. You can save your favorite workouts and track which ones work best for you."
    },
    {
      question: "How accurate are the pace and distance calculations?",
      answer: "Our calculations are based on treadmill speed settings and workout duration. For outdoor running, we recommend using GPS tracking. Pace is calculated as time per kilometer based on your treadmill speed."
    },
    {
      question: "Is an internet connection required?",
      answer: "An internet connection is needed for initial login, syncing progress, and Spotify integration. However, once workouts are loaded, you can complete them offline. Your progress will sync when you reconnect."
    }
  ], []);

  const supportOptions = useMemo(() => [
    {
      icon: MdEmail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "support@runningbuddy.com",
      color: "text-accent-primary"
    },
    {
      icon: MdChat,
      title: "Live Chat",
      description: "Chat with our support team (9 AM - 6 PM EST)",
      action: "Start Chat",
      color: "text-accent-success"
    },
    {
      icon: MdBugReport,
      title: "Report a Bug",
      description: "Help us improve by reporting issues",
      action: "Report Issue",
      color: "text-accent-error"
    },
    {
      icon: MdFeedback,
      title: "Send Feedback",
      description: "Share your ideas and suggestions",
      action: "Send Feedback",
      color: "text-accent-warning"
    }
  ], []);

  const resources = useMemo(() => [
    {
      icon: MdVideoLibrary,
      title: "Video Tutorials",
      description: "Watch how-to guides and workout demos",
      color: "text-accent-secondary"
    },
    {
      icon: MdMenuBook,
      title: "Running Guide",
      description: "Tips for beginners and training advice",
      color: "text-accent-primary"
    },
    {
      icon: MdInfo,
      title: "About Running Buddy",
      description: "Learn about our mission and team",
      color: "text-accent-success"
    }
  ], []);


  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-2">
        <MdHelp className="w-6 h-6 text-accent-warning" />
        Help & Support
      </h1>

      {/* Quick Support Options */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Get Help</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={index}
                className="flex items-center gap-4 p-4 bg-dark-800 hover:bg-dark-700 rounded-xl transition-all duration-200 text-left border border-dark-600 hover:border-accent-primary/30"
              >
                <div className={`w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${option.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-dark-100 font-medium mb-1">{option.title}</h3>
                  <p className="text-dark-400 text-sm">{option.description}</p>
                  <p className={`text-sm font-medium mt-1 ${option.color}`}>{option.action}</p>
                </div>
                <MdChevronRight className="w-5 h-5 text-dark-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <HelpFAQ faqData={faqData} />

      {/* Learning Resources */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Learning Resources</h2>
        <div className="space-y-3">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 bg-dark-800 hover:bg-dark-700 rounded-xl transition-all duration-200 text-left border border-dark-600 hover:border-accent-primary/30"
              >
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                  <IconComponent className={`w-5 h-5 ${resource.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-dark-200 font-medium">{resource.title}</h3>
                  <p className="text-dark-400 text-sm">{resource.description}</p>
                </div>
                <MdChevronRight className="w-5 h-5 text-dark-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* App Information */}
      <div className="card">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">App Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-dark-400">Version</span>
            <span className="text-dark-200">1.0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-dark-400">Last Updated</span>
            <span className="text-dark-200">January 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-dark-400">Platform</span>
            <span className="text-dark-200">Web App (PWA Ready)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-dark-400">Developer</span>
            <span className="text-dark-200">Running Buddy Team</span>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="card bg-accent-primary/10 border-accent-primary/20">
        <h2 className="text-lg font-semibold text-dark-100 mb-4 flex items-center gap-2">
          💡 Quick Tips
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-dark-200">
              <strong>First time?</strong> Start with Level 1 workouts and gradually increase intensity as you build endurance.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-dark-200">
              <strong>Stay motivated:</strong> Set small, achievable goals and track your progress in the Stats section.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-dark-200">
              <strong>Safety first:</strong> Always warm up before intense workouts and cool down afterwards.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-dark-200">
              <strong>Stay hydrated:</strong> Keep water nearby and take breaks when needed during longer workouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}