import React, {useEffect, useState} from "react";
import Icon from "./Icon.jsx";

/** pop-up modal components */
const Modal = ({show, onClose, title, msg, color = 'blue', duration, image}) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        if (show && duration) {
            setRemainingTime(duration);
            const timer = setTimeout(onClose, duration * 1000);
            const interval = setInterval(() => {
                setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    const colorVariants = {
        red: 'border-red-500 text-red-600',
        blue: 'border-blue-500 text-blue-600',
        green: 'border-green-500 text-green-600',
        orange: 'border-orange-500 text-orange-600',
        white: 'border-slate-200 text-slate-800'
    };

    const btnVariants = {
        red: 'bg-red-500 hover:bg-red-600',
        blue: 'bg-blue-500 hover:bg-blue-600',
        green: 'bg-green-500 hover:bg-green-600',
        orange: 'bg-orange-500 hover:bg-orange-600',
        white: 'bg-slate-500 hover:bg-slate-600'
    };

    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                 onClick={onClose}>
        <div
            className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border-t-8 flex flex-col items-center gap-4 transition-all transform scale-100 ${colorVariants[color] || colorVariants.white}`}
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-2xl font-black uppercase tracking-wide">{title}</h2>
            <div className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                {msg}
            </div>
            {image && (<div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                <Icon name={image} size={160}/>
            </div>)}
            <button
                onClick={onClose}
                className={`text-white px-8 py-3 rounded-xl transition-colors font-bold mt-4 shadow-sm w-full ${btnVariants[color] || btnVariants.white}`}
            >
                Confirm & Close
            </button>
            {duration && (<p className="text-sm text-slate-400 font-medium mt-1">
                Auto closing in {remainingTime}s
            </p>)}
        </div>
    </div>);
};

export default Modal;