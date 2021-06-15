import { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ShowPdf = () => {
  const [ConvertedPdfStream, setConvertedPdfStream] = useState("");
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzE2Yjc1Ni1jODIxLTRlMGItODdlNi03MDhkMDFiNjkxOGYiLCJMb2dpbl9Vc2VyX0lkIjoiNjQ4NCIsIlBlcnNvbl9JZCI6Ijc0MSIsImV4cCI6MTYxODYzNzEzOSwiaXNzIjoiaHR0cDovL2Jpb2Z1ZWxjaXJjbGUuY29tIiwiYXVkIjoiaHR0cDovL2Jpb2Z1ZWxjaXJjbGUuY29tIn0.8gWod-Pa83dnv89NNLPBNOjPZEJBViDYSRcoeBeqKnw";
    axios
      .get(
        "https://testapi.biofuelcircle.com:8050/BioFuelCommonUtilities/api/DocumentUpload/FetchDocumentAgainstAttachmentIdAzureStorage?Attachment_Id=4093",
        {
          headers: {
            Authorization: token,
          },
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        // const file = new Blob([res.data], {
        //   type: "application/pdf",
        // });
        // const fileURL = URL.createObjectURL(file);
        setConvertedPdfStream(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Document file={ConvertedPdfStream} onLoadSuccess={() => {}}>
      <Page pageNumber={1} />
    </Document>
  );
};
export default ShowPdf;
