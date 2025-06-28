import QAForm from "@/forms/QAForm";
import UserForm from "@/forms/UserForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import AddCertToLinkedIn from "./AddCertToLinkedIn";
import RegisterOnBlockchain from "./RegisterOnBlockchain";

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
    <div className="w-full flex flex-col items-center pt-20">
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
  certName="Testing Add Profile"
  organizationId={82553446}
  issueYear={2024}
  issueMonth={6}
  certUrl="https://trucvstorage.blob.core.windows.net/uploads/0d632c162012e48f177071abcd37f8151771f55d4a357d3ce14e41268814cdee_1750752487.pdf"
  certId={7890}
/>
<RegisterOnBlockchain />
    </div>
  );
};

export default HomePage;
