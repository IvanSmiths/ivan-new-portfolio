import { FC } from 'react';
import Time from "./Time";
import Paragraph from "./Paragraph";
import City from "./City";
import Weather from "./Weather";

const Text: FC = () => {
    return (
        <main className="grid fixed h-[30%] sm:h-2/4 bottom-small sm:top-0">
            <div className="grid-large flex flex-col gap-1 justify-center">
                <div className="flex gap-medium">
                    <City/>
                    <Weather/>
                    <Time/>
                </div>
                <Paragraph/>
            </div>
        </main>
    )
}

export default Text