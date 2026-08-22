import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const IBAN = 'GE90BG0000000765594000';

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
          <Button
            variant="plain"
            onClick={() => setAlertMessage('')}
            className="pl-2 text-xl leading-none text-white/80 hover:text-white"
            aria-label="Close notification"
          >
            ×
          </Button>
        </div>
      )}

      <div
        className="relative w-[480px] max-w-[95%] animate-slide-up rounded-xl bg-[#2a3a52] p-10
          text-[#f8f9fa] shadow-[0_10px_25px_rgba(0,0,0,0.3)] max-sm:p-7"
      >
        <Button
          variant="close"
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4"
          aria-label="Close donation modal"
        >
          ×
        </Button>

        <h3 className="mb-7 text-center text-3xl font-semibold tracking-wide text-white max-sm:text-2xl">
          Support My Work
        </h3>

        <div className="mb-8 flex rounded-lg bg-black/20 p-1">
          <Button
            variant="tab"
            role="tab"
            onClick={() => setActiveTab('bank')}
            aria-selected={activeTab === 'bank'}
          >
            Bank Transfer
          </Button>
          <Button
            variant="tab"
            role="tab"
            onClick={() => setActiveTab('donationalerts')}
            aria-selected={activeTab === 'donationalerts'}
          >
            DonationAlerts
          </Button>
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
            <Button
              variant="primary"
              fullWidth
              onClick={copyIban}
              className="gap-3"
              aria-label="Copy IBAN to clipboard"
            >
              <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
              Copy IBAN
            </Button>
          </div>
        ) : (
          <div className="py-4 text-center">
            <h4 className="mb-5 text-xl font-medium text-[#ff6b6b]">DonationAlerts</h4>
            <p className="mb-8 leading-relaxed text-white/80">
              Make a donation through DonationAlerts platform
            </p>
            <Button
              variant="donate"
              href="https://www.donationalerts.com/r/irondanch"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-3"
              aria-label="Go to DonationAlerts page"
            >
              Go to Donation Page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
