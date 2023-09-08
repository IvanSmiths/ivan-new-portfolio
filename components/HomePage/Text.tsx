import { FC } from 'react';
import Time from "./Time";
import Paragraph from "./Paragraph";
import City from "./City";
import WeatherPlaceholder from "./WeatherPlaceholder";

const Text: FC = () => {
    return (
        <main className="grid z-20 fixed h-[30%] sm:h-2/4 bottom-small sm:top-0">
            <div className="grid-column-8-11 flex flex-col justify-center">
                <div className="flex gap-medium">
                    <City/>
                    <WeatherPlaceholder/>
                    <Time/>
                </div>
                <Paragraph/>
            </div>
        </main>
    )
}

export default Text