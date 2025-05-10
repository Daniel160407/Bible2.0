import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/DonationModal.scss';

const DonationModal = () => {
    const [activeTab, setActiveTab] = useState('bank');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const copyToClipboard = (text, message) => {
        navigator.clipboard.writeText(text);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className="modal-overlay">
            {showAlert && (
                <div className="custom-alert">
                    {alertMessage}
                    <button 
                        onClick={() => setShowAlert(false)} 
                        className="alert-close"
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="donation-modal">
                <button 
                    className="close-modal" 
                    onClick={closeModal}
                    aria-label="Close donation modal"
                >
                    ×
                </button>
                
                <h3>Support My Work</h3>
                
                <div className="donation-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bank')}
                        aria-selected={activeTab === 'bank'}
                    >
                        Bank Transfer
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'donationalerts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('donationalerts')}
                        aria-selected={activeTab === 'donationalerts'}
                    >
                        DonationAlerts
                    </button>
                </div>
                
                <div className="donation-content">
                    {activeTab === 'bank' ? (
                        <div className="bank-details">
                            <h4>Bank Account Details</h4>
                            <div className="bank-info">
                                <p><strong>Account Holder:</strong> Daniel Abulashvili</p>
                                <p><strong>IBAN:</strong> GE90BG0000000765594000</p>
                                <p><strong>Bank:</strong> Bank of Georgia</p>
                                <p><strong>SWIFT/BIC:</strong> BAGAGE22</p>
                            </div>
                            <button 
                                className="copy-btn" 
                                onClick={() => copyToClipboard(
                                    'GE90BG0000000765594000', 
                                    'IBAN copied to clipboard!'
                                )}
                                aria-label="Copy IBAN to clipboard"
                            >
                                <svg className="copy-icon" viewBox="0 0 24 24">
                                    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                </svg>
                                Copy IBAN
                            </button>
                        </div>
                    ) : (
                        <div className="donationalerts-option">
                            <h4>DonationAlerts</h4>
                            <p>Make a donation through DonationAlerts platform</p>
                            <a 
                                href="https://www.donationalerts.com/r/irondanch" 
                                className="donate-link-btn" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Go to DonationAlerts page"
                            >
                                Go to Donation Page
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationModal;