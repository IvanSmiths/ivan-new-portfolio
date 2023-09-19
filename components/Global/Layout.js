import RouteTransition from "./RouteTransition";

export default function Layout({children}) {
    return (
        <RouteTransition>
            {children}
        </RouteTransition>
    );
}