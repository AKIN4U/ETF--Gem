// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { ApplicationSummary } from '../../types';
import Badge from '../ui/Badge';
import PaginationControls from './PaginationControls';

interface ApplicationsTableProps {
  applications: ApplicationSummary[];
  onView: (id: string) => void;
}

const ITEMS_PER_PAGE = 8;

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, onView }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Reset to first page whenever the source data changes (e.g., due to filtering)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [applications]);

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedApplications = applications.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Applicant Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Submission Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Scholarship Type</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedApplications.length > 0 ? (
                paginatedApplications.map((app) => (
                    <tr key={app.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{app.applicantName}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(app.submissionDate)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{app.scholarshipType}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><Badge status={app.status} /></td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button onClick={() => onView(app.id)} className="text-blue-600 hover:text-blue-900">View<span className="sr-only">, {app.applicantName}</span></button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                        No applications found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
         <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={applications.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
      )}
    </div>
  );
};

export default ApplicationsTable;