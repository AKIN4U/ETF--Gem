import React from 'react';
import { FormData, ParentData, ApplicationSummary, ApplicationStatus } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

// NOTE: These helper components are copied from `Step5Review.tsx` for component-level encapsulation
// and to avoid touching files not directly related to the feature request.
const ReviewSection: React.FC<{ title: string; data: Record<string, any> }> = ({ title, data }) => {
    const renderValue = (value: any) => {
        if (value instanceof File) return value.name;
        // Handle mock file objects
        if (value && typeof value === 'object' && value.name && typeof value.name === 'string') {
            return value.name;
        }
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (value === '' || value === null || value === undefined) return <span className="text-gray-400">Not Provided</span>;
        return String(value);
    };

    return (
        <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b">{title}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 text-sm">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <dt className="font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                        <dd className="mt-1 text-gray-900 break-words">{renderValue(value)}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

const ParentReview: React.FC<{ title: string; data: ParentData }> = ({ title, data }) => (
    <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50/50">
        <h3 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b">{title}</h3>
        <ReviewSection title="Personal" data={{ surname: data.surname, firstName: data.firstName, middleName: data.middleName, residentialAddress: data.residentialAddress, telephoneNumber: data.telephoneNumber }} />
        <ReviewSection title="Origin & Work" data={{ stateOfOrigin: data.stateOfOrigin, lga: data.lga, town: data.town, occupation: data.occupation, employer: data.employer, salaryGrade: data.salaryGrade, estimatedAnnualIncome: data.estimatedAnnualIncome }} />
        <ReviewSection title="Family & Church" data={{ spouseName: data.spouseName, numberOfChildren: data.numberOfChildren, childrenAges: data.childrenAges, yearsInChurch: data.yearsInChurch, positionInChurch: data.positionInChurch, dutiesInChurch: data.dutiesInChurch, hasOutstandingObligations: data.hasOutstandingObligations, outstandingObligationsDetails: data.outstandingObligationsDetails }} />
    </div>
);


interface ApplicationDetailProps {
  application: FormData;
  summary: ApplicationSummary;
  onBack: () => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ application, summary, onBack, onUpdateStatus }) => {
    const [isSchedulingInterview, setIsSchedulingInterview] = React.useState(false);
    const [interviewDetails, setInterviewDetails] = React.useState({
        date: '',
        time: '',
        location: '',
    });

    const { personalInfo, academicStatus, familyInfo, documents, declarations } = application;
    const applicantName = `${personalInfo.firstName} ${personalInfo.surname}`;

    const canTakeAction = summary.status === 'Submitted' || summary.status === 'Under Review';

    const handleAction = (action: 'Approve' | 'Reject' | 'Schedule Interview') => {
        if (action === 'Schedule Interview') {
            setIsSchedulingInterview(true);
            return;
        }

        let newStatus: ApplicationStatus | null = null;
        switch (action) {
            case 'Approve':
                newStatus = 'Approved';
                break;
            case 'Reject':
                newStatus = 'Rejected';
                break;
        }

        if (newStatus) {
            console.log(`Action: ${action} for applicant ${applicantName} (ID: ${summary.id})`);
            onUpdateStatus(summary.id, newStatus);
        }
    };
    
    const handleInterviewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInterviewDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmInterview = () => {
        if (!interviewDetails.date || !interviewDetails.time || !interviewDetails.location) {
            alert('Please fill in all interview details.');
            return;
        }

        console.log(`Scheduling interview for ${applicantName} (ID: ${summary.id}) with details:`, interviewDetails);
        onUpdateStatus(summary.id, 'Interview Scheduled');
        setIsSchedulingInterview(false);
    };

    const handleCancelSchedule = () => {
        setIsSchedulingInterview(false);
        setInterviewDetails({ date: '', time: '', location: '' }); // Reset form
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-4 border-b gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Application Details: <span className="text-blue-600">{applicantName}</span>
                </h2>
                <Button onClick={onBack} variant="secondary" className="self-start sm:self-center">
                    &larr; Back to List
                </Button>
            </div>
            
            {/* Admin Action Panel */}
            <div className="my-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h3>
                 {isSchedulingInterview ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                                label="Interview Date"
                                name="date"
                                type="date"
                                value={interviewDetails.date}
                                onChange={handleInterviewInputChange}
                                containerClassName="sm:col-span-1"
                                required
                            />
                            <Input
                                label="Interview Time"
                                name="time"
                                type="time"
                                value={interviewDetails.time}
                                onChange={handleInterviewInputChange}
                                containerClassName="sm:col-span-1"
                                required
                            />
                            <Input
                                label="Location / Link"
                                name="location"
                                type="text"
                                placeholder="e.g., Google Meet Link or Office Address"
                                value={interviewDetails.location}
                                onChange={handleInterviewInputChange}
                                containerClassName="sm:col-span-1"
                                required
                            />
                        </div>
                        <div className="flex gap-4 pt-2">
                            <Button onClick={handleConfirmInterview}>
                                Confirm Interview
                            </Button>
                            <Button onClick={handleCancelSchedule} variant="secondary">
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-wrap gap-4">
                            <Button 
                                onClick={() => handleAction('Approve')} 
                                disabled={!canTakeAction} 
                                className="!bg-green-600 !text-white hover:!bg-green-700 focus-visible:!outline-green-600"
                            >
                                Approve
                            </Button>
                            <Button 
                                onClick={() => handleAction('Reject')} 
                                disabled={!canTakeAction} 
                                variant="secondary" 
                                className="!bg-red-600 !text-white hover:!bg-red-700 ring-0 focus-visible:!outline-red-600"
                            >
                                Reject
                            </Button>
                            <Button 
                                onClick={() => handleAction('Schedule Interview')} 
                                disabled={!canTakeAction} 
                                variant="secondary"
                            >
                                Schedule Interview
                            </Button>
                        </div>
                        {!canTakeAction && (
                            <p className="text-sm text-gray-500 mt-4">
                                Actions are disabled for applications with status: <span className="font-semibold">"{summary.status}"</span>.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <ReviewSection title="Personal Information" data={personalInfo} />
                <ReviewSection title="Academic Status" data={academicStatus} />
                <ParentReview title="Father's Information" data={familyInfo.father} />
                <ParentReview title="Mother's Information" data={familyInfo.mother} />
                <ReviewSection title="Uploaded Documents" data={documents} />
                <ReviewSection title="Declarations" data={declarations} />
            </div>
        </div>
    );
};

export default ApplicationDetail;