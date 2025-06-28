import QAForm from "@/forms/QAForm";
import UserForm from "@/forms/UserForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import nasscomImage from "@/assets/nasscom-logo.svg";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
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
    <div className="w-full flex flex-col items-center pt-5">
      <div className="mx-auto flex flex-col md:flex-row items-center gap-5 mb-5">
        <img
          src={nasscomImage}
          alt="nasscom-logo"
          className="w-28 sm:w-32 lg:w-40 object-cover"
        />
        <h1 className="text-2xl md:text-4xl lg:text-4xl tracking-tight text-center">
          Developer Confluence Bangalore
        </h1>
      </div>
      <div
        className={twMerge(
          "mt-5 md:mt-0 md:border-t w-full rounded-xl shadow-lg p-6 mb-10 ",
          userFormSubmited ? "max-w-6xl" : "max-w-5xl"
        )}
      >
        {/* Back button */}
        {userFormSubmited && (
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer md:ml-5"
            onClick={() => setUserFormSubmited(false)}
          >
            <MdKeyboardDoubleArrowLeft />
            <span>Back</span>
          </Button>
        )}

        {/* form component */}
        {!userFormSubmited ? (
          <UserForm setIsFormSubmited={setUserFormSubmited} />
        ) : (
          <QAForm storeOnBlockchainHandler={storeOnBlockchain} />
        )}
      </div>

      {/* certificate component */}
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
