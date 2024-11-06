import { NextPage } from "next";
import Counter from "./not-found/Counter";
import ImpossibleButton from "./not-found/ImpossibleButton";
import Main from "./not-found/Main";

const NotFound: NextPage = () => {
  return (
    <>
      <Counter />
      <Main />
      <ImpossibleButton />
    </>
  );
};

export default NotFound;
