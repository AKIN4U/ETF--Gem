// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { StepProps, ParentData } from '../../types';
import { NIGERIAN_STATES, YES_NO_OPTIONS } from '../../constants';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

const ParentForm: React.FC<{ parent: ParentData; parentType: 'father' | 'mother'; update: (data: ParentData) => void }> = ({ parent, parentType, update }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        update({ ...parent, [id]: value });
    };

    return (
        <Card title={`${parentType.charAt(0).toUpperCase() + parentType.slice(1)}'s Biodata`}>
            <Input label="Surname" id="surname" value={parent.surname} onChange={handleChange} required />
            <Input label="First Name" id="firstName" value={parent.firstName} onChange={handleChange} required />
            <Input label="Middle Name" id="middleName" value={parent.middleName} onChange={handleChange} />
            <Input label="Residential Address" id="residentialAddress" containerClassName="sm:col-span-full" value={parent.residentialAddress} onChange={handleChange} required />
            <Input label="Telephone Number" id="telephoneNumber" type="tel" value={parent.telephoneNumber} onChange={handleChange} required />
            <Select label="State of Origin" id="stateOfOrigin" value={parent.stateOfOrigin} onChange={handleChange} required>
                <option value="">Select State...</option>
                {NIGERIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
            </Select>
            <Input label="Local Government Area (LGA)" id="lga" value={parent.lga} onChange={handleChange} required />
            <Input label="Town" id="town" value={parent.town} onChange={handleChange} required />
            <Input label="Occupation" id="occupation" value={parent.occupation} onChange={handleChange} required />
            <Input label="Employer" id="employer" value={parent.employer} onChange={handleChange} required />
            <Input label="Salary Grade (Optional)" id="salaryGrade" value={parent.salaryGrade} onChange={handleChange} />
            <Input label="Estimated Annual Income (Amount or Range)" id="estimatedAnnualIncome" value={parent.estimatedAnnualIncome} onChange={handleChange} />
            <Input label="Name of Spouse" id="spouseName" value={parent.spouseName} onChange={handleChange} />
            <Input label="Number of Children" id="numberOfChildren" type="number" value={parent.numberOfChildren} onChange={handleChange} />
            <Input label="Ages of your children (comma-separated)" id="childrenAges" value={parent.childrenAges} onChange={handleChange} containerClassName="sm:col-span-full" />
            <Input label="How many years have you served in Church?" id="yearsInChurch" type="number" value={parent.yearsInChurch} onChange={handleChange} />
            <Input label="What is your current position in Church?" id="positionInChurch" value={parent.positionInChurch} onChange={handleChange} />
            <TextArea label="What are your duties/roles in Church?" id="dutiesInChurch" value={parent.dutiesInChurch} onChange={handleChange} />
            <Select label="Do you have any outstanding obligations?" id="hasOutstandingObligations" value={parent.hasOutstandingObligations} onChange={handleChange} required>
                <option value="">Select...</option>
                {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </Select>
            {parent.hasOutstandingObligations === 'Yes' && (
                <TextArea label="If Yes, please list them:" id="outstandingObligationsDetails" value={parent.outstandingObligationsDetails} onChange={handleChange} required />
            )}
        </Card>
    );
};


const Step3FamilyInfo: React.FC<StepProps> = ({ data, updateFormData, nextStep, prevStep }) => {
    const { familyInfo } = data;

    const updateParent = (parentType: 'father' | 'mother') => (parentData: ParentData) => {
        updateFormData({ familyInfo: { ...familyInfo, [parentType]: parentData } });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 3: Family Information</h2>
            <div className="space-y-8">
                <ParentForm parent={familyInfo.father} parentType="father" update={updateParent('father')} />
                <ParentForm parent={familyInfo.mother} parentType="mother" update={updateParent('mother')} />
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex justify-between">
                    <Button onClick={prevStep} variant="secondary">Back</Button>
                    <Button onClick={nextStep}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Step3FamilyInfo;