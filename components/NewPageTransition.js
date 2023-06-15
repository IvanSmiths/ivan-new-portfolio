import cn from 'classnames';
import { useRef, useState, useEffect } from 'react';

const NewPageTransition = ({ Component, pageProps, router }) => {
    const last = useRef(Component);

    const [transitioning, setTransitioning] = useState(false);
    useEffect(() => {
        const handler = () => {
            setTransitioning(true);
            setTimeout(() => {
                last.current = Component;
                setTransitioning(false);
            }, 980);
        };

        router.events.on('routeChangeComplete', handler);

        return () => {
            router.events.off('routeChangeComplete', handler);
        };
    }, [Component, router.events]);

    const Screen = !transitioning ? Component : last.current;

    return (
        <div
            className={cn({
                'animate-slideUpEnter': !transitioning,
                'animate-slideUpLeave': transitioning,
            })}
        >
            <Screen {...pageProps} />
        </div>
    );
};
export default NewPageTransition;
