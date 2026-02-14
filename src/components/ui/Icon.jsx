import React, {useState} from "react";

/** icon components */
const Icon = ({name, ext = 'gif', size = 40, className = ""}) => {
    const [error, setError] = useState(false);
    const src = `/icon/${name}.${ext}`;

    if (error) {
        // return (<div
        //     style={{width: size, height: size}}
        //     className={`bg-slate-200 rounded-md flex items-center justify-center text-slate-500 font-bold text-xs uppercase overflow-hidden border border-slate-300 shadow-inner ${className}`}
        // >
        //     {name.substring(0, 3)}
        // </div>);
        return (<img
            src='/icon/barrier.gif'
            alt={name}
            loading="lazy"
            width={size}
            height={size}
            onError={() => setError(true)}
            className={`object-contain select-none pointer-events-none ${className}`}
            draggable={false}
        />)
    }

    return (<img
        src={src}
        alt={name}
        loading="lazy"
        width={size}
        height={size}
        onError={() => setError(true)}
        className={`object-contain select-none pointer-events-none ${className}`}
        draggable={false}
    />);
};

export default Icon;