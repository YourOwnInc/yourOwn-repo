import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText, AnimatedTextSequence } from '../../Features/landing/AnimatedText';
import { useUser } from '../../core/auth/UserContext';

interface OnboardingProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'name' | 'bio' | 'complete';

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { user, setUser, setOnboardingComplete } = useUser();
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  const welcomeTexts = [
    'Welcome to YourOwn',
    'Where your technical and creative pursuits',
    'come to life as a beautiful portfolio',
    'Let\'s begin your journey...',
  ];

  useEffect(() => {
    if (welcomeComplete && step === 'welcome') {
      setTimeout(() => setStep('name'), 500);
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
        onComplete();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-y-auto">
      <div className="max-w-2xl w-full space-y-8">
        {/* Welcome Sequence */}
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <AnimatedTextSequence
                texts={welcomeTexts}
                delayBetween={0.3}
                duration={0.6}
                onComplete={() => setWelcomeComplete(true)}
                className="space-y-4"
              />
            </motion.div>
          )}

          {/* Name Input */}
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <AnimatedText delay={0} duration={0.6}>
                <h2 className="text-4xl font-semibold mb-2">What's your name?</h2>
              </AnimatedText>
              <AnimatedText delay={0.3} duration={0.6}>
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
                  className="w-full max-w-md mx-auto px-6 py-4 rounded-xl bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg backdrop-blur-sm transition-all"
                />
              </AnimatedText>
              <AnimatedText delay={0.6} duration={0.6}>
                <button
                  onClick={handleNameSubmit}
                  disabled={!name.trim()}
                  className={`px-8 py-3 rounded-xl transition-all text-lg font-medium ${
                    name.trim()
                      ? 'bg-[#A9CBF0] hover:bg-indigo-600 text-white'
                      : 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  }`}
                >
                  Continue →
                </button>
              </AnimatedText>
            </motion.div>
          )}

          {/* Bio Input */}
          {step === 'bio' && (
            <motion.div
              key="bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <AnimatedText delay={0} duration={0.6}>
                <h2 className="text-4xl font-semibold mb-2 bg-[#A9CBF0]">
                  Tell us about yourselffffff, {name}
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.2} duration={0.6}>
                <p className="text-[#A9CBF0] text-lg mb-4">
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
                  className="w-full max-w-2xl mx-auto px-6 py-4 rounded-xl bg-zinc-800/50 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg backdrop-blur-sm transition-all resize-none"
                />
              </AnimatedText>
              <AnimatedText delay={0.6} duration={0.6}>
                <button
                  onClick={handleBioSubmit}
                  disabled={!bio.trim()}
                  className={`px-8 py-3 rounded-xl transition-all text-lg font-medium ${
                    bio.trim()
                      ? 'bg-[#F5EBCB] hover:bg-[#FBC1C1] text-white shadow-lg shadow-[#FBC1C1]'
                      : 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                  }`}
                >
                  Create My Portfolio →
                </button>
              </AnimatedText>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
