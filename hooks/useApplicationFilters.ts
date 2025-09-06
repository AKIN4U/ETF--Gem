// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { ApplicationSummary } from '../types';

export type SortKey = keyof ApplicationSummary | '';
export type SortDirection = 'ascending' | 'descending';

const initialFilters = {
    status: 'all',
    scholarshipType: 'all',
    searchTerm: '',
};

const initialSortConfig = { key: 'submissionDate' as SortKey, direction: 'descending' as SortDirection };

export const useApplicationFilters = (applications: ApplicationSummary[]) => {
    const [filters, setFilters] = React.useState(initialFilters);
    const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: SortDirection }>(initialSortConfig);

    const handleFilterChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSortChange = React.useCallback((sortValue: string) => {
        const [key, direction] = sortValue.split('-') as [SortKey, SortDirection];
        setSortConfig({ key, direction });
    }, []);

    const handleReset = React.useCallback(() => {
        setFilters(initialFilters);
        setSortConfig(initialSortConfig);
    }, []);

    const filteredAndSortedApplications = React.useMemo(() => {
        let processedApps = [...applications];

        // Filtering
        processedApps = processedApps.filter(app => {
            const statusMatch = filters.status === 'all' || app.status === filters.status;
            const typeMatch = filters.scholarshipType === 'all' || app.scholarshipType === filters.scholarshipType;
            const searchMatch = !filters.searchTerm || app.applicantName.toLowerCase().includes(filters.searchTerm.toLowerCase());
            return statusMatch && typeMatch && searchMatch;
        });

        // Sorting
        if (sortConfig.key) {
            processedApps.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        
        return processedApps;
    }, [applications, filters, sortConfig]);

    return {
        filters,
        sortConfig,
        filteredAndSortedApplications,
        handleFilterChange,
        handleSortChange,
        handleReset,
    };
};