// FIX: Add missing React import to fix reference errors.
import React from 'react';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.552-1.348l-3.675-3.675a2.25 2.25 0 00-3.182 0l-1.99 1.99a11.91 11.91 0 01-5.46-5.46l1.99-1.99a2.25 2.25 0 000-3.182L6.848 3.102a2.25 2.25 0 00-1.348-.552H3.75A2.25 2.25 0 001.5 4.5v2.25z" />
  </svg>
);

export default PhoneIcon;