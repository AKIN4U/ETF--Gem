// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { StepProps } from '../../types';
import { YES_NO_OPTIONS } from '../../constants';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const Step2AcademicStatus: React.FC<StepProps> = ({ data, updateFormData, nextStep, prevStep }) => {
    const [isValid, setIsValid] = React.useState(false);
    const { academicStatus } = data;

    React.useEffect(() => {
        const { schoolName, schoolAddress, presentClass, schoolFees, textbookFees, hasEnoughTextbooks, hasLibraryAccess, sentAwayForFees, repeatedClass } = academicStatus;
        setIsValid(!!(schoolName && schoolAddress && presentClass && schoolFees && textbookFees && hasEnoughTextbooks && hasLibraryAccess && sentAwayForFees && repeatedClass));
    }, [academicStatus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        updateFormData({ academicStatus: { ...academicStatus, [id]: value } });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Academic Status</h2>
            <div className="space-y-8">
                <Card title="School Information">
                    <Input label="Name of Your School" id="schoolName" value={academicStatus.schoolName} onChange={handleChange} containerClassName="sm:col-span-full" required />
                    <Input label="Address of School" id="schoolAddress" value={academicStatus.schoolAddress} onChange={handleChange} containerClassName="sm:col-span-full" required />
                    <Input label="Present Class/Level" id="presentClass" value={academicStatus.presentClass} onChange={handleChange} required />
                    <Input label="JAMB/University Entrance Exam Score (for tertiary applicants)" id="jambScore" type="number" value={academicStatus.jambScore} onChange={handleChange} />
                    <Input label="Number of Children in Your Class (Optional)" id="childrenInClass" type="number" value={academicStatus.childrenInClass} onChange={handleChange} />
                    <Input label="Position in Class (Optional)" id="positionInClass" type="number" value={academicStatus.positionInClass} onChange={handleChange} />
                </Card>

                <Card title="Financial & Academic Details">
                    <Input label="How much are your present school fees? (Amount)" id="schoolFees" type="number" value={academicStatus.schoolFees} onChange={handleChange} required />
                    <Input label="How much do you pay for textbooks per year? (Amount)" id="textbookFees" type="number" value={academicStatus.textbookFees} onChange={handleChange} required />
                    <Select label="Do you have enough textbooks?" id="hasEnoughTextbooks" value={academicStatus.hasEnoughTextbooks} onChange={handleChange} required>
                        <option value="">Select...</option>
                        {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                    <Select label="Do you have unhindered access to libraries?" id="hasLibraryAccess" value={academicStatus.hasLibraryAccess} onChange={handleChange} required>
                        <option value="">Select...</option>
                        {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                    <Select label="Have you ever been sent away from school for non-payment of school fees?" id="sentAwayForFees" value={academicStatus.sentAwayForFees} onChange={handleChange} required>
                        <option value="">Select...</option>
                        {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                    <Select label="Have you ever repeated a class?" id="repeatedClass" value={academicStatus.repeatedClass} onChange={handleChange} required>
                        <option value="">Select...</option>
                        {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </Select>
                </Card>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex justify-between">
                    <Button onClick={prevStep} variant="secondary">Back</Button>
                    <Button onClick={nextStep} disabled={!isValid}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Step2AcademicStatus;