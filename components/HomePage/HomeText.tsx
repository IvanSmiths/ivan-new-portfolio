import {FC} from 'react';
import Time from "./Time";
import HomeParagraph from "./HomeParagraph";
import HomeCity from "./HomeCity";
import HomeWeatherPlaceholder from "./HomeWeatherPlaceholder";

const HomeText: FC = () => {
    return (
        <main className="grid z-20 fixed h-[30%] sm:h-2/4 bottom-small sm:top-0">
            <div className="grid-column-8-11 flex flex-col justify-center">
                <div className="flex gap-medium">
                    <HomeCity/>
                    <HomeWeatherPlaceholder/>
                    <Time/>
                </div>
                <HomeParagraph/>
            </div>
        </main>
    )
}

export default HomeText