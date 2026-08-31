import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    delay?: number;
}

function DefferedComponent({ children, delay = 200 }: Props) {
    const [isDeffered, setIsDeffered] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsDeffered(true);
        }, 200);
        return () => clearTimeout(timeoutId);
    }, []);

    if (!isDeffered) {
        return null;
    }
    return <>{children}</>;
}

export default DefferedComponent;
