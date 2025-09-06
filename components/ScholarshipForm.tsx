// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { FormData, ParentData } from '../types';
import Stepper from './ui/Stepper';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2AcademicStatus from './steps/Step2AcademicStatus';
import Step3FamilyInfo from './steps/Step3FamilyInfo';
import Step4DocumentUpload from './steps/Step4DocumentUpload';
import Step5Review from './steps/Step5Review';
import Step6Success from './steps/Step6Success';

const emptyParentData: ParentData = {
    surname: '', firstName: '', middleName: '', residentialAddress: '', telephoneNumber: '',
    stateOfOrigin: '', lga: '', town: '', occupation: '', employer: '', hasOutstandingObligations: ''
};

const initialFormData: FormData = {
    personalInfo: {
        surname: '', firstName: '', middleName: '', applicationDate: new Date().toISOString().split('T')[0],
        age: '', dob: '', sex: '', stateOfOrigin: '', lga: '', town: '', hasReceivedBefore: '',
    },
    academicStatus: {
        schoolName: '', schoolAddress: '', presentClass: '', schoolFees: '', textbookFees: '',
        hasEnoughTextbooks: '', hasLibraryAccess: '', sentAwayForFees: '', repeatedClass: '',
    },
    familyInfo: {
        father: { ...emptyParentData },
        mother: { ...emptyParentData },
    },
    documents: {},
    declarations: {
        childConfirmation: false, parentConfirmation: false, churchMembershipConfirmation: ''
    },
};


const ScholarshipForm: React.FC = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState<FormData>(initialFormData);

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);
    const goToStep = (step: number) => {
        if (step < currentStep) {
            setCurrentStep(step);
        }
    };

    const renderStep = () => {
        const props = { data: formData, updateFormData, nextStep, prevStep };
        switch (currentStep) {
            case 1:
                return <Step1PersonalInfo {...props} />;
            case 2:
                return <Step2AcademicStatus {...props} />;
            case 3:
                return <Step3FamilyInfo {...props} />;
            case 4:
                return <Step4DocumentUpload {...props} />;
            case 5:
                return <Step5Review {...props} />;
            case 6:
                return <Step6Success />;
            default:
                return <div>Form Completed</div>;
        }
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
             {currentStep <= 5 && <Stepper currentStep={currentStep} onStepClick={goToStep} />}
            <div className="mt-8">
                {renderStep()}
            </div>
        </div>
    );
};

export default ScholarshipForm;