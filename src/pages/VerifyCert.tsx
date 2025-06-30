import React, { useState } from "react";
import { verifyCertificate } from "./RegisterOnBlockchain";
import nasscomImage from "@/assets/nasscom-logo.svg";
import {
  User,
  Building2,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
// Helper function to get SHA-256 file hash
const getFileHash = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
};

const VerifyCert: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [fileHash, setFileHash] = useState<string>("");
  const [error, setError] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
  const [userData,setUserData] =useState({
    name:"",
    orgName:"",
    certType:"",
    certUri:"",
    issueTime:0
  })

    const formattedDate = new Date(Number(userData.issueTime) * 1000).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");
    if (file) {
      setFileName(file.name);
      try {
        const hash = await getFileHash(file);
        setFileHash(hash);
      } catch (err) {
        setError("Failed to compute file hash");
        console.error(err);
      }
    }
  };

  const handleVerify = async () => {
    if (!fileHash) {
      setError("Please upload a file first.");
      return;
    }
    try {
        setLoading(true);
      let response = await verifyCertificate({ fileHash });
      if (response) {
        console.log("Response from verifyCertificate:", response[0]);
        if(response[0] === "")
        {
            setError("Certificate not found or invalid.");
            setLoading(false);
            return;
        }
        setUserData({
          name: response[0] || "",
          orgName: response[1] || "Unknown Organization",
          certType: response[2] || "Unknown Certificate Type",
          certUri: response[3] || "#",
          issueTime: response[4] || 0,
        });
        setLoading(false);
        console.log("Certificate verified successfully:", response);
      } else {
        setError("Certificate verification failed.");
        setLoading(false);
      }
    } catch (err) {
      setError("Error verifying certificate");
      console.error(err);
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center bg-white flex-col space-y-6">
        <div className="mx-auto flex flex-col md:flex-row items-center gap-5 mt-5">
            <Link to="/" className="absolute flex items-center gap-2 text-black hover:text-blue-800 left-2 border border-blue-600 rounded-lg px-3 py-2 transition-colors">
        <MdArrowBack className="w-5 h-5" /> Back
        </Link>
        <img
          src={nasscomImage}
          alt="nasscom-logo"
          className="w-28 sm:w-32 lg:w-40 object-cover"
        />
        <h1 className="text-2xl md:text-4xl lg:text-4xl tracking-tight text-center">
          Developer Confluence Bangalore
        </h1>
      </div>
        <h1 className="text-3xl font-bold text-blue-800 mb-4 mt-10 ">Verify Your Certificate on Blockchain</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload a File</h2>
        
        <input
          type="file"
          onChange={handleFileUpload}
          className="w-full mb-4 border border-gray-300 rounded p-2"
        />

        {fileName && (
          <div className="text-sm text-gray-700 mb-3 overflow-hidden">
            <strong>File:</strong> {fileName}
          </div>
        )}

        {fileHash && (
          <div className="text-sm text-green-600 break-all mb-2">
            <strong>File Hash:</strong> {fileHash}
          </div>
        )}

        {!loading?<button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">Verify Certificate
          </button>:<p>verifying...</p>}

        {error && (
          <div className="text-sm text-red-600 mt-2">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
       {userData.name&&<div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
        <User className="w-6 h-6 text-blue-600" />
        {userData.name || "User Name"}
      </h2>

      <div className="flex items-start gap-2 text-gray-700">
        <Building2 className="w-5 h-5 mt-1 text-gray-500" />
        <span>
          <strong>Issued By:</strong> {userData.orgName || "Organization Name"}
        </span>
      </div>

      <div className="flex items-start gap-2 text-gray-700">
        <BadgeCheck className="w-5 h-5 mt-1 text-gray-500" />
        <span>
          <strong>Certificate:</strong> {userData.certType || "Certificate Type"}
        </span>
      </div>

      <div className="flex items-start gap-2 text-gray-700">
        <CalendarDays className="w-5 h-5 mt-1 text-gray-500" />
        <span>
          <strong>Date:</strong> {formattedDate}
        </span>
      </div>

      <a
        href={userData.certUri || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        View Certificate
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>}
    </div>
  );
};

export default VerifyCert;
