import { NextPage } from "next";
import ImpossibleButton from "./not-found/ImpossibleButton";
import Counter from "./not-found/Counter";

const NotFound: NextPage = () => {
  return (
    <div>
      <Counter />
      <ImpossibleButton />
    </div>
  );
};

export default NotFound;
