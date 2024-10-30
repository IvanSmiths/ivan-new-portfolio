import { NextPage } from "next";
import ImpossibleButton from "./not-found/ImpossibleButton";
import Counter from "./not-found/Counter";
import Main from "./not-found/Main";

const NotFound: NextPage = () => {
  return (
    <div>
      <Counter />
      <Main />
      <ImpossibleButton />
    </div>
  );
};

export default NotFound;
