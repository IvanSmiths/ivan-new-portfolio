import { NextPage } from "next";
import Counter from "../components/not-found/Counter";
import ImpossibleButton from "../components/not-found/ImpossibleButton";
import Main from "../components/not-found/Main";

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
