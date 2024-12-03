import RegisterComp from "@/component/RegisterComp/RegisterComp";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div>
      <Suspense>
        <RegisterComp />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
