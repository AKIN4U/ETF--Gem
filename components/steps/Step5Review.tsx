// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { StepProps, ParentData } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ReviewSection: React.FC<{ title: string; data: Record<string, any> }> = ({ title, data }) => {
    const renderValue = (value: any) => {
        if (value instanceof File) return value.name;
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (value === '' || value === null || value === undefined) return <span className="text-gray-400">Not Provided</span>;
        return String(value);
    };

    return (
        <div className="mb-8 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b">{title}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 text-sm">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <dt className="font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                        <dd className="mt-1 text-gray-900">{renderValue(value)}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

const ParentReview: React.FC<{ title: string; data: ParentData }> = ({ title, data }) => (
    <div className="mb-8 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b">{title}</h3>
        <ReviewSection title="Personal" data={{ surname: data.surname, firstName: data.firstName, middleName: data.middleName, residentialAddress: data.residentialAddress, telephoneNumber: data.telephoneNumber }} />
        <ReviewSection title="Origin & Work" data={{ stateOfOrigin: data.stateOfOrigin, lga: data.lga, town: data.town, occupation: data.occupation, employer: data.employer, salaryGrade: data.salaryGrade, estimatedAnnualIncome: data.estimatedAnnualIncome }} />
        <ReviewSection title="Family & Church" data={{ spouseName: data.spouseName, numberOfChildren: data.numberOfChildren, childrenAges: data.childrenAges, yearsInChurch: data.yearsInChurch, positionInChurch: data.positionInChurch, dutiesInChurch: data.dutiesInChurch, hasOutstandingObligations: data.hasOutstandingObligations, outstandingObligationsDetails: data.outstandingObligationsDetails }} />
    </div>
);


const Step5Review: React.FC<StepProps> = ({ data, updateFormData, nextStep, prevStep }) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { declarations } = data;

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Form Submitted', data);
            setIsSubmitting(false);
            nextStep(); // Move to success screen
        }, 2000);
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        updateFormData({ declarations: { ...declarations, [id]: checked } });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        updateFormData({ declarations: { ...declarations, [id]: value } });
    }

    const canSubmit = declarations.childConfirmation && declarations.parentConfirmation && declarations.churchMembershipConfirmation;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 5: Review & Submit</h2>
            <p className="text-sm text-gray-600 mb-6">Please review all the information you have provided carefully. If you need to make any changes, you can go back to the previous steps.</p>

            <ReviewSection title="Personal Information" data={data.personalInfo} />
            <ReviewSection title="Academic Status" data={data.academicStatus} />
            <ParentReview title="Father's Information" data={data.familyInfo.father} />
            <ParentReview title="Mother's Information" data={data.familyInfo.mother} />
            <ReviewSection title="Uploaded Documents" data={data.documents} />

            <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Declarations & Signatures</h3>
                <div className="space-y-4">
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input id="childConfirmation" type="checkbox" checked={declarations.childConfirmation} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="childConfirmation" className="font-medium text-gray-900">Child's Agreement/Confirmation</label>
                            <p className="text-gray-500">I confirm that all the information provided is true and accurate to the best of my knowledge.</p>
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input id="parentConfirmation" type="checkbox" checked={declarations.parentConfirmation} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="parentConfirmation" className="font-medium text-gray-900">Parent/Guardian's Agreement/Confirmation</label>
                             <p className="text-gray-500">I confirm that all the information provided is true and accurate, and I support this application.</p>
                        </div>
                    </div>
                    <Input 
                        label="Church Membership Confirmation (Self-Declaration)" 
                        id="churchMembershipConfirmation"
                        placeholder="e.g., Member ID, or 'Confirmed Member of CCC Central Cathedral'"
                        value={declarations.churchMembershipConfirmation}
                        onChange={handleTextChange}
                        containerClassName="sm:col-span-4"
                        required
                    />
                </div>
                <p className="text-xs text-red-600 mt-4 bg-red-50 p-3 rounded-md">
                   <strong>One Child Per Family Rule:</strong> Please be aware that the system is designed to flag potential duplicate applications from the same family for committee review. Submitting applications for more than one child may affect your eligibility.
                </p>
            </div>


            <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex justify-between">
                    <Button onClick={prevStep} variant="secondary" disabled={isSubmitting}>Back</Button>
                    <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Step5Review;