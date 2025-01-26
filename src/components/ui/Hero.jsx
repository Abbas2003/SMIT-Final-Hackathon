import React from 'react';
import LoanCategories from './LoanCategory';


const Hero = () => {
    return (
        <section className="text-gray-600 body-font min-h-screen">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                        SAYLANI WELFARE TRUST
                    </h2>
                    <h1 className="sm:text-3xl text-5xl font-medium title-font mb-4 text-gray-900">
                        Microfinance Bank
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Saylani Welfare Trust's Microfinance Bank offers interest-free loans through the <strong>Qarze Hasana program</strong>. This program provides financial assistance to individuals and families in need, enabling them to start or grow small businesses, meet emergency expenses, and improve their livelihoods.
                    </p>
                </div>
                <LoanCategories />
            </div>
        </section>
    );
};

export default Hero;
