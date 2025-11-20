import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText, AnimatedTextSequence } from '../components/AnimatedText';
import { useUser } from '../contexts/UserContext';

type LandingStep = 'hero' | 'welcome' | 'name' | 'bio';

export default function Landing() {
  const navigate = useNavigate();
  const { user, setUser, setOnboardingComplete } = useUser();
  const [step, setStep] = useState<LandingStep>('hero');
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [heroComplete, setHeroComplete] = useState(false);
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  // Hero section texts
  const heroTexts = [
    'Welcome to YourOwn',
    'Portfolio Builder -',
    'Build Your Experiences',
    'Own Your Code',
  ];

  // Welcome section texts
  const welcomeTexts = [
    'Let\'s create something beautiful together',
    'Your journey starts here',
    'Tell us about yourself',
  ];

  // Auto-advance from hero to welcome
  useEffect(() => {
    if (heroComplete && step === 'hero') {
      setTimeout(() => setStep('welcome'), 800);
    }
  }, [heroComplete, step]);

  // Auto-advance from welcome to name
  useEffect(() => {
    if (welcomeComplete && step === 'welcome') {
      setTimeout(() => setStep('name'), 800);
    }
  }, [welcomeComplete, step]);

  const handleNameSubmit = () => {
    if (name.trim()) {
      const userId = user?.id || `user-${Date.now()}`;
      setUser({
        id: userId,
        name: name.trim(),
        email: user?.email,
        bio: user?.bio,
      });
      setStep('bio');
    }
  };

  const handleBioSubmit = () => {
    if (bio.trim() && name.trim()) {
      setUser({
        id: user?.id || `user-${Date.now()}`,
        name: name.trim(),
        email: user?.email,
        bio: bio.trim(),
      });
      setOnboardingComplete(true);
      setTimeout(() => {
        navigate('/portfoliobuilder', { replace: true });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl  from-[#F5EBCB] via-[#F9FAE3] to-[#92BFD0] text-white font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Hero Section */}
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A9CBF0] rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            <div className="relative z-10 max-w-4xl">
              <AnimatedTextSequence
                texts={heroTexts}
                delayBetween={0.4}
                duration={0.8}
                onComplete={() => setHeroComplete(true)}
                className="space-y-6"
              />
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: heroTexts.length * 0.4 + 0.8, duration: 0.6 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-[#A9CBF0]"
              >
                <span className="text-sm">Scroll to continue</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Welcome Section */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 "
          >
            <div className="max-w-2xl space-y-8 ">
              <AnimatedTextSequence
                texts={welcomeTexts}
                delayBetween={0.3}
                duration={0.6}
                onComplete={() => setWelcomeComplete(true)}
                className="space-y-4 "
              />
            </div>
          </motion.div>
        )}

        {/* Name Input Section */}
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6"
          >
            <div className="max-w-2xl w-full space-y-6">
              <AnimatedText delay={0} duration={0.6}>
                <h2 className="text-5xl font-semibold mb-4 bg-[#A9CBF0] bg-clip-text text-transparent">
                  What's your name?
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.3} duration={0.6}>
                <p className="text-zinc-400 text-lg mb-6">
                  We'd love to know what to call you
                </p>
              </AnimatedText>
              <AnimatedText delay={0.6} duration={0.6}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && name.trim()) {
                      handleNameSubmit();
                    }
                  }}
                  placeholder="Enter your name"
                  autoFocus
                  className="w-full max-w-md mx-auto px-6 py-4 rounded-xl bg-zinc-800/50 backdrop-blur-sm text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#FBC1C1] focus:border-transparent text-lg transition-all"
                />
              </AnimatedText>
              <AnimatedText delay={0.9} duration={0.6}>
                <button
                  onClick={handleNameSubmit}
                  disabled={!name.trim()}
                  className={`px-8 py-3 rounded-xl transition-all text-lg font-medium ${
                    name.trim()
                      ? 'bg-[#F5EBCB] hover:bg-[#FBC1C1] text-white shadow-lg shadow-[#FBC1C1]'
                      : 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  }`}
                >
                  Continue →
                </button>
              </AnimatedText>
            </div>
          </motion.div>
        )}

        {/* Bio Input Section */}
        {step === 'bio' && (
          <motion.div
            key="bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6"
          >
            <div className="max-w-2xl w-full space-y-6">
              <AnimatedText delay={0} duration={0.6}>
                <h2 className="text-5xl font-semibold mb-4 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                  Tell us about yourself, {name}
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.2} duration={0.6}>
                <p className="text-zinc-400 text-lg mb-6">
                  Share a paragraph about yourself in your respective field
                </p>
              </AnimatedText>
              <AnimatedText delay={0.4} duration={0.6}>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write about your technical or creative pursuits..."
                  autoFocus
                  rows={6}
                  className="w-full max-w-2xl mx-auto px-6 py-4 rounded-xl bg-zinc-800/50 backdrop-blur-sm text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all resize-none"
                />
              </AnimatedText>
              <AnimatedText delay={0.6} duration={0.6}>
                <button
                  onClick={handleBioSubmit}
                  disabled={!bio.trim()}
                  className={`px-8 py-3 rounded-xl transition-all text-lg font-medium ${
                    bio.trim()
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                      : 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  }`}
                >
                  Create My Portfolio →
                </button>
              </AnimatedText>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

