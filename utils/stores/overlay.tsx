"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

type Overlay = {
	isHidden: boolean;
	hide: () => void;
};

const OverlayContext = createContext<Overlay | undefined>(undefined);

const STORAGE_KEY = "overlay-storage";

export function OverlayProvider({ children }: { children: ReactNode }) {
	const [isHidden, setIsHidden] = useState<boolean>(true);

	// Load from sessionStorage on mount
	useEffect(() => {
		try {
			const stored = sessionStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (parsed?.state?.isHidden !== undefined) {
					setIsHidden(parsed.state.isHidden);
				}
			}
		} catch {
			// Ignore errors reading from sessionStorage
		}
	}, []);

	// Save to sessionStorage whenever isHidden changes
	useEffect(() => {
		try {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ state: { isHidden } }),
			);
		} catch {
			// Ignore errors writing to sessionStorage
		}
	}, [isHidden]);

	const hide = () => {
		setIsHidden(false);
	};

	return (
		<OverlayContext.Provider value={{ isHidden, hide }}>
			{children}
		</OverlayContext.Provider>
	);
}

export function useOverlayStore(): Overlay {
	const context = useContext(OverlayContext);
	if (context === undefined) {
		throw new Error("useOverlayStore must be used within an OverlayProvider");
	}
	return context;
}
