type Props = {
  certName: string;
  organizationId: number;
  issueYear: number;
  issueMonth: number;
  certUrl: string;
  certId: number;
  expirationYear?: number;
  expirationMonth?: number;
};

const AddCertToLinkedIn = ({
  certName,
  organizationId,
  issueYear,
  issueMonth,
  certUrl,
  certId,
  expirationYear,
  expirationMonth,
}: Props) => {
  const encodedCertName = encodeURIComponent(certName);
  const encodedCertUrl = encodeURIComponent(certUrl);

  let url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodedCertName}&organizationId=${organizationId}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodedCertUrl}&certId=${certId}`;

  if (expirationYear && expirationMonth) {
    url += `&expirationYear=${expirationYear}&expirationMonth=${expirationMonth}`;
  }

  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src="https://download.linkedin.com/desktop/add2profile/buttons/en_US.png"
          alt="LinkedIn Add to Profile button"
        />
      </a>
    </div>
  );
};

export default AddCertToLinkedIn;
