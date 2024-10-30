import Link from "next/link";
import { NextPage } from "next";
import ImpossibleButton from "./globalComponents/ImpossibleButton";

const NotFound: NextPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <ImpossibleButton />
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
