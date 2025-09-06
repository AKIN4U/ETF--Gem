// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { ApplicationStatus } from '../../types';

interface BadgeProps {
  status: ApplicationStatus;
}

const statusColors: Record<ApplicationStatus, string> = {
  Submitted: 'bg-blue-100 text-blue-800 ring-blue-600/20',
  'Under Review': 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
  'Interview Scheduled': 'bg-purple-100 text-purple-800 ring-purple-600/20',
  Approved: 'bg-green-100 text-green-800 ring-green-600/20',
  Rejected: 'bg-red-100 text-red-800 ring-red-600/20',
};

const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default Badge;