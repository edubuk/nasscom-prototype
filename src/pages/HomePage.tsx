import QAForm from "@/forms/QAForm";
import UserForm from "@/forms/UserForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import nasscomImage from "@/assets/nasscom-logo.svg";
import AddCertToLinkedIn from "./AddCertToLinkedIn";

const HomePage = () => {
  const [userFormSubmited, setUserFormSubmited] = useState<boolean>(
    JSON.parse(localStorage.getItem("userFormSubmited") || "false")
  );
  // TODO: AJEET SIR;
  const storeOnBlockchain = () => {
    // TODO: store on blockchain integrations and linkdein may be
    console.log("HEY SUBMITTED AND RESULTS STORED ON BLOCKCHAIN");
  };
  return (
    <div className="w-full flex flex-col items-center pt-10">
      <div className="mx-auto flex flex-col md:flex-row items-center gap-5 mb-5">
        <img
          src={nasscomImage}
          alt="nasscom-logo"
          className="w-28 sm:w-32 lg:w-40 object-cover"
        />
        <h1 className="text-2xl md:text-4xl lg:text-6xl tracking-tight mb-4">
          Dev Conference Bangalore
        </h1>
      </div>
      <div
        className={twMerge(
          "border w-full rounded-xl shadow-lg p-6",
          userFormSubmited ? "max-w-6xl" : "max-w-4xl"
        )}
      >
        {/* form component */}
        {!userFormSubmited ? (
          <UserForm setIsFormSubmited={setUserFormSubmited} />
        ) : (
          <QAForm storeOnBlockchainHandler={storeOnBlockchain} />
        )}
      </div>
      <AddCertToLinkedIn
        certName="Zero Trust Security Fundamentals"
        organizationId={82553446}
        issueYear={2024}
        issueMonth={6}
        certUrl="https://trucvstorage.blob.core.windows.net/uploads/0d632c162012e48f177071abcd37f8151771f55d4a357d3ce14e41268814cdee_1750752487.pdf"
        certId={7890}
      />
    </div>
  );
};

export default HomePage;
