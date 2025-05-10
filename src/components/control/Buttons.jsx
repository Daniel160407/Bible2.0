import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Buttons.scss';

const Buttons = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const presentViewWindowRef = useRef(null);
    const windowButtonsRef = useRef(null);
    const hideButtonRef = useRef(null);
    const alertTimeoutRef = useRef(null);
    const windowCheckIntervalRef = useRef(null);
    const navigate = useNavigate();

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    const onDocumentationClick = () => {
        window.open('/documentation', '_blank');
    };

    const onBibleClick = () => {
        window.open('/bible', '_blank');
    };

    const onOpenPresentViewClick = () => {
        if (presentViewWindowRef.current && !presentViewWindowRef.current.closed) {
            setShowAlert(true);
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
            alertTimeoutRef.current = setTimeout(() => setShowAlert(false), 3000);
            
            try {
                presentViewWindowRef.current.focus();
            } catch (e) {
                console.log("Couldn't focus existing window");
            }
            return;
        }

        const newWindow = window.open('/presentview', 'presentViewWindow', 'width=800,height=600');
        
        if (newWindow) {
            presentViewWindowRef.current = newWindow;
            
            windowCheckIntervalRef.current = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(windowCheckIntervalRef.current);
                    presentViewWindowRef.current = null;
                }
            }, 1000);

            const fullscreenTimeout = setTimeout(() => {
                try {
                    if (!newWindow.closed) {
                        newWindow.document.documentElement.requestFullscreen();
                    }
                } catch (e) {
                    console.log("Fullscreen error:", e);
                }
            }, 1000);

            newWindow.addEventListener('beforeunload', () => {
                clearTimeout(fullscreenTimeout);
                clearInterval(windowCheckIntervalRef.current);
                presentViewWindowRef.current = null;
            });
        }
    };

    const onDonateClick = () => {
        navigate('/donation');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hideButtonRef.current && hideButtonRef.current.contains(event.target)) {
                return;
            }
            
            if (!isHidden && windowButtonsRef.current && !windowButtonsRef.current.contains(event.target)) {
                setIsHidden(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
            if (windowCheckIntervalRef.current) clearInterval(windowCheckIntervalRef.current);
        };
    }, [isHidden]);

    return (
        <div className="buttons-container">
            <div id='hide' onClick={toggleHidden} ref={hideButtonRef}>
                <img id='hideButton' src='/images/hide.jpeg' alt="Hide" />
            </div>
            <div className={`windowButtons ${isHidden ? 'hidden' : ''}`} ref={windowButtonsRef}>
                <div className='btns'>
                    <button onClick={onDonateClick} className="button-85">Donate</button>
                    <button onClick={onDocumentationClick} className='documentationBtn'>Documentation</button>
                    <button onClick={onBibleClick} className='bibleBtn'>Bible</button>
                    <button onClick={onOpenPresentViewClick} className="button-85" role="button">Open Present View</button>
                </div>
                {showAlert && (
                    <div className="present-view-alert">
                        Present View is already open!
                    </div>
                )}
                <div className='madeBy'>
                    <p>Made with <span className='redHeart'>&#10084;</span> by <a href='https://www.facebook.com/daniel.abulashvili.5/' target='_blank' rel='noopener noreferrer'>Daniel</a></p>
                </div>
            </div>
        </div>
    );
};

export default Buttons;