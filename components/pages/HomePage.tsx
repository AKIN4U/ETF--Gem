// FIX: Add missing React import to fix reference errors.
import React from 'react';
import Button from '../ui/Button';
import AcademicCapIcon from '../icons/AcademicCapIcon';
import UsersIcon from '../icons/UsersIcon';
import HeartIcon from '../icons/HeartIcon';
import LocationMarkerIcon from '../icons/LocationMarkerIcon';
import PhoneIcon from '../icons/PhoneIcon';
import MailIcon from '../icons/MailIcon';


interface HomePageProps {
    onApplyNow: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onApplyNow }) => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Students celebrating graduation" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-40" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mx-auto max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Empowering Futures Through Education</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            The Education Trust Fund (ETF) Scholarship Program by CCC Central Cathedral, Abuja, is dedicated to supporting the academic aspirations of our community's youth.
                        </p>
                        <div className="mt-10">
                            <Button onClick={onApplyNow} variant="primary">Apply for Scholarship</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about-us" className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Our Mission</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Commitment to Education</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                           This application aims to digitize and streamline the entire scholarship lifecycle, from application submission to fund disbursement and beneficiary monitoring, ensuring efficiency, transparency, and adherence to the program's established policies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Eligibility Section */}
            <div id="eligibility" className="py-24 sm:py-32">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                         <h2 className="text-base font-semibold leading-7 text-blue-600">Eligibility Criteria</h2>
                         <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Who Can Apply?</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <AcademicCapIcon className="h-6 w-6 text-white" />
                                    </div>
                                    Academic Standing
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Applicants must be enrolled in a primary, secondary, or tertiary institution and demonstrate a need for financial assistance.</dd>
                           </div>
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <UsersIcon className="h-6 w-6 text-white" />
                                    </div>
                                    Church Membership
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Applicants or their parents/guardians should be confirmed members of the Celestial Church of Christ.</dd>
                           </div>
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <HeartIcon className="h-6 w-6 text-white" />
                                    </div>
                                    One Child Per Family
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">To ensure fair distribution, the scholarship is limited to one beneficiary per family at any given time.</dd>
                           </div>
                        </dl>
                    </div>
                 </div>
            </div>
            
            {/* How to Apply Section */}
            <div id="how-to-apply" className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Get Started</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How to Apply</p>
                    </div>
                     <div className="mx-auto mt-16 max-w-4xl">
                        <ul className="space-y-8">
                            <li className="flex gap-x-3">
                                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-white font-bold">1</span>
                                <span><strong className="font-semibold text-gray-900">Prepare Your Documents.</strong> Gather all required documents, such as school bills, birth certificates, and academic results.</span>
                            </li>
                             <li className="flex gap-x-3">
                                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-white font-bold">2</span>
                                <span><strong className="font-semibold text-gray-900">Fill the Online Form.</strong> Click "Apply Now" and carefully fill out all sections of the application form with accurate information.</span>
                            </li>
                             <li className="flex gap-x-3">
                                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-white font-bold">3</span>
                                <span><strong className="font-semibold text-gray-900">Review and Submit.</strong> Double-check all your entries and uploaded documents before submitting your application.</span>
                            </li>
                        </ul>
                        <div className="mt-10 flex justify-center">
                            <Button onClick={onApplyNow} variant="primary">Start Your Application</Button>
                        </div>
                    </div>
                </div>
            </div>

             {/* Contact Us Section */}
            <div id="contact-us" className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Get in Touch</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Information</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Have questions or need assistance with your application? Please reach out to us.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <LocationMarkerIcon className="h-6 w-6 text-white" />
                                    </div>
                                    Our Address
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    CCC Central Cathedral<br />
                                    Abuja, FCT, Nigeria
                                </dd>
                           </div>
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <PhoneIcon className="h-6 w-6 text-white" />
                                    </div>
                                    Phone Number
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    <a href="tel:+234-800-000-0000" className="hover:text-blue-600">+234-800-000-0000</a>
                                </dd>
                           </div>
                           <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <MailIcon className="h-6 w-6 text-white" />
                                    </div>
                                    Email Address
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    <a href="mailto:etf.support@cccabuja.org" className="hover:text-blue-600">etf.support@cccabuja.org</a>
                                </dd>
                           </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;