import QAForm from "@/forms/QAForm";
import UserForm from "@/forms/UserForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import nasscomImage from "@/assets/nasscom-logo.svg";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Button } from "@/components/ui/button";
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
    <div className="w-full flex flex-col items-center pt-0">
      <div className="mx-auto mt-2 flex flex-col  items-center gap-5 md:mb-2">
        <img
          src={nasscomImage}
          alt="nasscom-logo"
          className="w-28 sm:w-32 lg:w-40 object-cover"
        />
      </div>

      <div
        className={twMerge(
          "mt-2 md:mt-0 md:border-t w-full rounded-xl shadow-lg p-6 mb-10 ",
          userFormSubmited ? "max-w-6xl" : "max-w-5xl"
        )}
      >
        <div className="w-full  flex flex-col items-center justify-center overflow-hidden rounded-md mb-5 lg:mb-0">
          <div
            className={twMerge(
              "text-2xl md:text-3xl md:max-w-xl lg:text-4xl lg:max-w-4xl mx-auto text-center",
              ""
            )}
          >
            <h1 className="bg-clip-text pb-2 text-transparent bg-gradient-to-t from-purple-400  to-slate-900 tracking-tighter font-semibold">
              Developer Confluence Bangalore
            </h1>
          </div>
        </div>
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
    </div>
  );
};

export default HomePage;
