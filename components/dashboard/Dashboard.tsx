// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { mockApplications } from '../../mock-data';
import { useApplicationFilters } from '../../hooks/useApplicationFilters';
import ApplicationFilters from './ApplicationFilters';
import ApplicationsTable from './ApplicationsTable';

const Dashboard: React.FC = () => {
    const {
        filters,
        sortConfig,
        filteredAndSortedApplications,
        handleFilterChange,
        handleSortChange,
        handleReset,
    } = useApplicationFilters(mockApplications);

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Application Management</h2>
            <ApplicationFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onReset={handleReset}
                currentSort={`${sortConfig.key}-${sortConfig.direction}`}
            />
            <ApplicationsTable applications={filteredAndSortedApplications} />
        </div>
    );
};

export default Dashboard;