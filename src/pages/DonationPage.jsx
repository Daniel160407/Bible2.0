import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IBAN = 'GE90BG0000000765594000';

const tabClass = (isActive) =>
  `relative z-[1] flex-1 cursor-pointer rounded-md p-3 text-center text-base font-medium
   transition-all duration-300 max-sm:p-2.5 max-sm:text-sm ${
     isActive
       ? "bg-[#4a90e2]/20 font-semibold text-white after:absolute after:-bottom-1 after:left-1/2 after:h-[3px] after:w-3/5 after:-translate-x-1/2 after:rounded-[3px] after:bg-[#4a90e2] after:content-['']"
       : 'text-white/70 hover:text-white'
   }`;

const DonationPage = () => {
  const [activeTab, setActiveTab] = useState('bank');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!alertMessage) return;
    const timer = setTimeout(() => setAlertMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const copyIban = () => {
    navigator.clipboard.writeText(IBAN);
    setAlertMessage('IBAN copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex animate-fade-in items-center justify-center bg-black/75 backdrop-blur-[3px] font-roboto">
      {alertMessage && (
        <div
          className="fixed top-[30px] left-1/2 z-[2100] flex -translate-x-1/2 animate-slide-down
            items-center gap-4 rounded-lg bg-[#4caf50] px-6 py-3 font-medium text-white
            shadow-[0_6px_12px_rgba(0,0,0,0.15)] max-sm:top-5 max-sm:px-5 max-sm:py-2.5 max-sm:text-sm"
        >
          {alertMessage}
          <button
            onClick={() => setAlertMessage('')}
            className="cursor-pointer pl-2 text-xl leading-none text-white/80 transition-colors hover:text-white"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      <div
        className="relative w-[480px] max-w-[95%] animate-slide-up rounded-xl bg-[#2a3a52] p-10
          text-[#f8f9fa] shadow-[0_10px_25px_rgba(0,0,0,0.3)] max-sm:p-7"
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-3xl leading-none
            text-white/70 transition-all duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white"
          aria-label="Close donation modal"
        >
          ×
        </button>

        <h3 className="mb-7 text-center text-3xl font-semibold tracking-wide text-white max-sm:text-2xl">
          Support My Work
        </h3>

        <div className="mb-8 flex rounded-lg bg-black/20 p-1">
          <button
            className={tabClass(activeTab === 'bank')}
            onClick={() => setActiveTab('bank')}
            aria-selected={activeTab === 'bank'}
          >
            Bank Transfer
          </button>
          <button
            className={tabClass(activeTab === 'donationalerts')}
            onClick={() => setActiveTab('donationalerts')}
            aria-selected={activeTab === 'donationalerts'}
          >
            DonationAlerts
          </button>
        </div>

        {activeTab === 'bank' ? (
          <div>
            <h4 className="mb-6 text-center text-xl font-medium text-[#4a90e2]">
              Bank Account Details
            </h4>
            <div className="mb-8 rounded-[10px] border border-white/5 bg-black/15 p-6">
              {[
                ['Account Holder:', 'Daniel Abulashvili'],
                ['IBAN:', IBAN],
                ['Bank:', 'Bank of Georgia'],
                ['SWIFT/BIC:', 'BAGAGE22'],
              ].map(([label, value]) => (
                <p
                  key={label}
                  className="mb-4 flex leading-relaxed last:mb-0 max-sm:flex-col max-sm:gap-1"
                >
                  <strong className="min-w-[140px] font-medium text-[#4a90e2] max-sm:min-w-0">
                    {label}
                  </strong>
                  {value}
                </p>
              ))}
            </div>
            <button
              onClick={copyIban}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg
                bg-gradient-to-br from-[#4a90e2] to-[#3a7bc8] px-6 py-3.5 font-medium text-white
                shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300
                hover:-translate-y-0.5 hover:from-[#3a7bc8] hover:to-[#2a6bb8]
                hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-0"
              aria-label="Copy IBAN to clipboard"
            >
              <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
              Copy IBAN
            </button>
          </div>
        ) : (
          <div className="py-4 text-center">
            <h4 className="mb-5 text-xl font-medium text-[#ff6b6b]">DonationAlerts</h4>
            <p className="mb-8 leading-relaxed text-white/80">
              Make a donation through DonationAlerts platform
            </p>
            <a
              href="https://www.donationalerts.com/r/irondanch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-br
                from-[#ff6b6b] to-[#ff5252] px-8 py-3.5 font-medium text-white no-underline
                shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300
                hover:-translate-y-0.5 hover:from-[#ff5252] hover:to-[#ff3d3d]
                hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:translate-y-0"
              aria-label="Go to DonationAlerts page"
            >
              Go to Donation Page
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
