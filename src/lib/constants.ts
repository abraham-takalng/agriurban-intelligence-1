import { kebeles } from '../data/mockGisData';

export const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Extreme': return 'rgb(239, 68, 68)'; // red-500
    case 'High': return 'rgb(249, 115, 22)'; // orange-500
    case 'Moderate': return 'rgb(234, 179, 8)'; // yellow-500
    case 'Low': return 'rgb(34, 197, 94)'; // green-500
    default: return 'rgb(107, 114, 128)'; // gray-500
  }
};

export const CONTACT_INFO = {
  email: 'takalngabraham@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abraham-takalng',
  github: 'https://github.com/abraham-takalng',
  telegram: 'https://t.me/abraham_takalng',
};