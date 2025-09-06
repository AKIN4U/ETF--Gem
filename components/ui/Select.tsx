// FIX: Add missing React import to fix reference errors.
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  containerClassName?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, containerClassName = 'sm:col-span-3', children, ...props }) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          {...props}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default Select;