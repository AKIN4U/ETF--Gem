// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { StepProps } from '../../types';
import Card from '../ui/Card';
import FileUpload from '../ui/FileUpload';
import Button from '../ui/Button';

const Step4DocumentUpload: React.FC<StepProps> = ({ data, updateFormData, nextStep, prevStep }) => {
    const [isValid, setIsValid] = React.useState(false);
    const { documents } = data;

    // These are mandatory for all applicants as per PRD
    React.useEffect(() => {
        const { schoolFeesProof, birthCertificate, latestSchoolResult, financialAssistanceLetter } = documents;
        setIsValid(!!(schoolFeesProof && birthCertificate && latestSchoolResult && financialAssistanceLetter));
    }, [documents]);

    const handleFileChange = (field: keyof typeof documents) => (file: File | undefined) => {
        updateFormData({ documents: { ...documents, [field]: file } });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 4: Required Document Uploads</h2>
            <p className="text-sm text-gray-600 mb-6">Please upload clear copies of the following documents. Note that some documents are mandatory for all applicants, while others are specific to your level.</p>
            
            <Card title="Upload Documents">
                <FileUpload
                    label="Present Annual School Fees (Proof, e.g., official bill)"
                    id="schoolFeesProof"
                    onFileChange={handleFileChange('schoolFeesProof')}
                    fileName={documents.schoolFeesProof?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
                 <FileUpload
                    label="Recipient's Birth Certificate"
                    id="birthCertificate"
                    onFileChange={handleFileChange('birthCertificate')}
                    fileName={documents.birthCertificate?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
                 <FileUpload
                    label="Latest School Results (from current or previous institution)"
                    id="latestSchoolResult"
                    onFileChange={handleFileChange('latestSchoolResult')}
                    fileName={documents.latestSchoolResult?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
                 <FileUpload
                    label="One Page Letter explaining why you require financial assistance"
                    id="financialAssistanceLetter"
                    onFileChange={handleFileChange('financialAssistanceLetter')}
                    fileName={documents.financialAssistanceLetter?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.doc,.docx"
                />
                <div className="sm:col-span-full border-t my-4"></div>
                 <FileUpload
                    label="Primary School Certificate (if applicable, e.g., for secondary applicants)"
                    id="primarySchoolCertificate"
                    onFileChange={handleFileChange('primarySchoolCertificate')}
                    fileName={documents.primarySchoolCertificate?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
                 <FileUpload
                    label="Secondary/High School Leaving Certificate (e.g., WAEC, NECO) (Mandatory for tertiary applicants)"
                    id="secondarySchoolCertificate"
                    onFileChange={handleFileChange('secondarySchoolCertificate')}
                    fileName={documents.secondarySchoolCertificate?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
                <FileUpload
                    label="JAMB/University Entrance Examination Result Slip (Mandatory for tertiary applicants)"
                    id="jambResult"
                    onFileChange={handleFileChange('jambResult')}
                    fileName={documents.jambResult?.name}
                    containerClassName="sm:col-span-full"
                    acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                />
            </Card>

            <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex justify-between">
                    <Button onClick={prevStep} variant="secondary">Back</Button>
                    <Button onClick={nextStep} disabled={!isValid}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Step4DocumentUpload;