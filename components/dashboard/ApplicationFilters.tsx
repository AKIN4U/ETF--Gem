// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { APPLICATION_STATUSES, SCHOLARSHIP_TYPES } from '../../constants';
import Select from '../ui/Select';
import Button from '../ui/Button';
import SearchIcon from '../icons/SearchIcon';

interface ApplicationFiltersProps {
  filters: {
    status: string;
    scholarshipType: string;
    searchTerm: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
  currentSort: string;
}

const sortOptions = [
    { label: 'Submission Date (Newest)', value: 'submissionDate-descending' },
    { label: 'Submission Date (Oldest)', value: 'submissionDate-ascending' },
    { label: 'Applicant Name (A-Z)', value: 'applicantName-ascending' },
    { label: 'Applicant Name (Z-A)', value: 'applicantName-descending' },
];

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({ filters, onFilterChange, onSortChange, onReset, currentSort }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1">
                    <label htmlFor="searchTerm" className="block text-sm font-medium leading-6 text-gray-900">
                        Search by Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            name="searchTerm"
                            id="searchTerm"
                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="e.g., John Doe"
                            value={filters.searchTerm}
                            onChange={onFilterChange}
                        />
                    </div>
                </div>

                <Select label="Filter by Status" name="status" id="status" value={filters.status} onChange={onFilterChange} containerClassName="lg:col-span-1">
                    <option value="all">All Statuses</option>
                    {APPLICATION_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </Select>

                <Select label="Filter by Type" name="scholarshipType" id="scholarshipType" value={filters.scholarshipType} onChange={onFilterChange} containerClassName="lg:col-span-1">
                    <option value="all">All Types</option>
                    {SCHOLARSHIP_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </Select>
                
                <Select label="Sort by" name="sort" id="sort" value={currentSort} onChange={e => onSortChange(e.target.value)} containerClassName="lg:col-span-1">
                     {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </Select>

                <Button variant="secondary" onClick={onReset} className="w-full h-fit">Reset</Button>
            </div>
        </div>
    );
};

export default ApplicationFilters;