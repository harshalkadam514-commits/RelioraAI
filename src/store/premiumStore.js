import { useState } from 'react';

export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Essential Reliora experience',
    features: [
      'Basic AI conversations',
      'Basic memory',
      'Daily mood check-in',
      'Basic journal',
      'Core productivity tools',
    ],
  },
  {
    id: 'pro',
    name: 'Reliora Pro',
    price: '₹299',
    period: 'month',
    description: 'More intelligence and personalization',
    features: [
      'Advanced AI models',
      'Advanced memory',
      'Unlimited conversations',
      'Advanced voice features',
      'Personalized AI insights',
      'Premium themes',
    ],
  },
  {
    id: 'ultimate',
    name: 'Reliora Ultimate',
    price: '₹699',
    period: 'month',
    description: 'Complete companion experience',
    features: [
      'Everything in Pro',
      'Priority AI processing',
      'Maximum memory',
      'Advanced personalization',
      'Premium voice experience',
      'Early access to new features',
    ],
  },
];

export function usePremium() {
  const [currentPlan, setCurrentPlan] = useState('free');

  const upgrade = (planId) => {
    setCurrentPlan(planId);
  };

  const restorePurchase = () => {
    return currentPlan !== 'free';
  };

  const isPremium = currentPlan !== 'free';

  return {
    plans,
    currentPlan,
    isPremium,
    upgrade,
    restorePurchase,
  };
}
