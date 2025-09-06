// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { StepProps } from '../../types';
import { NIGERIAN_STATES, YES_NO_OPTIONS } from '../../constants';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FileUpload from '../ui/FileUpload';
import Button from '../ui/Button';

const Step1PersonalInfo: React.FC<StepProps> = ({ data, updateFormData, nextStep }) => {
  const [isValid, setIsValid] = React.useState(false);
  const { personalInfo } = data;
  
  React.useEffect(() => {
    const { surname, firstName, dob, sex, stateOfOrigin, hasReceivedBefore, passportPicture } = personalInfo;
    const isReceivedBeforeValid = hasReceivedBefore === 'No' || (hasReceivedBefore === 'Yes' && personalInfo.previousScholarshipDate);
    setIsValid(!!(surname && firstName && dob && sex && stateOfOrigin && hasReceivedBefore && isReceivedBeforeValid && passportPicture));
  }, [personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateFormData({ personalInfo: { ...personalInfo, [id]: value } });
  };
  
  const handleFileChange = (file: File | undefined) => {
    updateFormData({ personalInfo: { ...personalInfo, passportPicture: file } });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 1: Child's Personal Information</h2>
      <div className="space-y-8">
        <Card title="Personal Details">
          <Input label="Surname" id="surname" value={personalInfo.surname} onChange={handleChange} required />
          <Input label="First Name" id="firstName" value={personalInfo.firstName} onChange={handleChange} required />
          <Input label="Middle Name" id="middleName" value={personalInfo.middleName} onChange={handleChange} />
          <Input label="Date of Application" id="applicationDate" type="date" value={personalInfo.applicationDate} onChange={handleChange} disabled />
          <Input label="Age" id="age" type="number" value={personalInfo.age} onChange={handleChange} required />
          <Input label="Date of Birth" id="dob" type="date" value={personalInfo.dob} onChange={handleChange} required />
          <Select label="Sex" id="sex" value={personalInfo.sex} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </Card>

        <Card title="Origin & Location">
          <Select label="State of Origin" id="stateOfOrigin" value={personalInfo.stateOfOrigin} onChange={handleChange} required>
            <option value="">Select State...</option>
            {NIGERIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
          </Select>
          <Input label="Local Government Area (LGA)" id="lga" value={personalInfo.lga} onChange={handleChange} required />
          <Input label="Town" id="town" value={personalInfo.town} onChange={handleChange} required />
        </Card>

        <Card title="Required Upload & Previous Scholarship">
          <FileUpload 
            label="Applicant's Passport Picture" 
            id="passportPicture" 
            onFileChange={handleFileChange}
            fileName={personalInfo.passportPicture?.name}
            acceptedFileTypes="image/*"
            containerClassName="sm:col-span-full"
          />
          <Select label="Have you been granted a CCC ETF Scholarship before?" id="hasReceivedBefore" value={personalInfo.hasReceivedBefore} onChange={handleChange} containerClassName="sm:col-span-3" required>
            <option value="">Select...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </Select>
          {personalInfo.hasReceivedBefore === 'Yes' && (
            <Input label="If Yes, When?" id="previousScholarshipDate" type="date" value={personalInfo.previousScholarshipDate} onChange={handleChange} required />
          )}
        </Card>
      </div>

      <div className="mt-8 pt-5 border-t border-gray-200">
        <div className="flex justify-end">
          <Button onClick={nextStep} disabled={!isValid}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Step1PersonalInfo;