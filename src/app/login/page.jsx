import LoginComp from "@/component/LoginComp/LoginComp";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense>
        <LoginComp />
      </Suspense>
    </div>
  );
};

export default page;
