import React, { useEffect, useRef, useState } from 'react';

const Eye = ({ imgUrl, eyeClass }) => {

    const eyeRef = useRef(null);
    const [eyeStyle, setEyeStyle] = useState({});

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!eyeRef.current) return;
            const eye = eyeRef.current.getBoundingClientRect();
            const centerX = eye.left + eye.width / 2;
            const centerY = eye.top + eye.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), 10);

            const angle = Math.atan2(dy, dx);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            setEyeStyle({
                transform: `translate(${x}px, ${y}px)`
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
         <div className={`eye-container ${eyeClass}`} ref={eyeRef}>
          <img className='eye-img' src={imgUrl} alt='EyeImage' style={eyeStyle} />
        </div>
    );
}

export default Eye;
