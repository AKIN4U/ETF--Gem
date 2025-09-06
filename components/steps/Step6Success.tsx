// FIX: Add missing React import to fix reference errors.
import React from 'react';

const Step6Success: React.FC = () => {
    return (
        <div className="text-center py-10 px-6">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Application Submitted Successfully!</h2>
            <p className="mt-2 text-gray-600">
                Thank you for applying for the ETF Scholarship Program.
            </p>
            <p className="mt-2 text-gray-600">
                You will receive a confirmation email shortly. You can monitor the status of your application by logging into your portal.
            </p>
            <div className="mt-8">
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Submit Another Application
                </button>
            </div>
        </div>
    );
};

export default Step6Success;