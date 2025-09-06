// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { mockApplications, mockApplicationDetails } from '../../mock-data';
import { useApplicationFilters } from '../../hooks/useApplicationFilters';
import ApplicationFilters from './ApplicationFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationDetail from './ApplicationDetail';
import { ApplicationSummary, FormData, ApplicationStatus } from '../../types';

interface SelectedApplication {
    details: FormData;
    summary: ApplicationSummary;
}

const Dashboard: React.FC = () => {
    const [applications, setApplications] = React.useState<ApplicationSummary[]>(mockApplications);
    
    const {
        filters,
        sortConfig,
        filteredAndSortedApplications,
        handleFilterChange,
        handleSortChange,
        handleReset,
    } = useApplicationFilters(applications);

    const [selectedApplication, setSelectedApplication] = React.useState<SelectedApplication | null>(null);

    const handleViewApplication = (id: string) => {
        const details = mockApplicationDetails.get(id);
        const summary = applications.find(app => app.id === id);

        if (details && summary) {
            setSelectedApplication({ details, summary });
            window.scrollTo(0, 0);
        } else {
            alert('Detailed view for this application is not available in this demo.');
        }
    };

    const handleBackToList = () => {
        setSelectedApplication(null);
    };

    const handleUpdateStatus = (id: string, newStatus: ApplicationStatus) => {
        setApplications(prevApps => 
            prevApps.map(app => 
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
        
        setSelectedApplication(prev => {
            if (prev && prev.summary.id === id) {
                // Also update the status in the detailed view to disable buttons
                return {
                    ...prev,
                    summary: { ...prev.summary, status: newStatus }
                };
            }
            return prev;
        });
        
        alert(`Application ${id} status updated to "${newStatus}".`);
    };

    if (selectedApplication) {
        return (
            <ApplicationDetail 
                application={selectedApplication.details} 
                summary={selectedApplication.summary} 
                onBack={handleBackToList} 
                onUpdateStatus={handleUpdateStatus}
            />
        );
    }


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
            <ApplicationsTable applications={filteredAndSortedApplications} onView={handleViewApplication} />
        </div>
    );
};

export default Dashboard;