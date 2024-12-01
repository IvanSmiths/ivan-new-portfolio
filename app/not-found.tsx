import { NextPage } from "next";
import Counter from "./components/not-found/Counter";
import Main from "./components/not-found/Main";
import ImpossibleButton from "./components/not-found/ImpossibleButton";

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
