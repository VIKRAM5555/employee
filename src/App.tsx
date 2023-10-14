import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyForm from "./DataFrom";
import Test from "./QrReader";
import LaptopDetails from "./LaptopDetails";
import { WebcamCapture } from "./WebCamCapture";
import FormWithCheckbox from "./FormWithCheckbox";
import { ThankyouPage } from "./ThankyouPage";
import { WelcomePage } from "./WelcomePage";
import ExitCheckBox from "./ExitCheckBox";
import { ThankYouExit } from "./ThankYouExit";
import { SecurityLogin } from "./SecurityLogin";
import StandardListImage from "./StandardListImage";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { createContext, useContext, useState } from "react";

// import { StandardListImageExit } from "./StandardListImageExit";

export const locateContext = createContext({});

function App() {
  localStorage.formdata;
  const [showLabel, setShowLabel] = useState(true);
  const [formDataLaptop, setFormDataLaptop] = useState({
    laptopBrand: "",
    laptopSerialNumber: "",
    laptopLocation: "",
    laptopImage: "",
  });

  const [userFormImage, setUserFormImage] = useState({
    image: null,
  });

  const [formDataEmployee, setFormDataEmployee] = useState({
    name: "",
    id: "",
    laptopSerialNumber: "",
    inTime: "",
  });

  const [formDataCheckBox, setFormDataCheckBox] = useState({
    laptop: false,
    pendrive: false,
    hardDisk: false,
    bluetooth: false,
    others: false,
    otherText: "",
  });
  interface CapturedImage {
    id: number;
    imageSrc?: string | null;
  }
  const [currentDate, setCurrentDate] = useState("");
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);

  // const extractEmployeeInfo = (scanResult: string | null) => {
  //   if (!scanResult) return { id: "", name: "" };
  //   const parts = scanResult.split("/");
  //   const id = parts[1] || "";
  //   const name = parts[0] || "";
  //   return { id, name };
  // };

  // Create functions to set Employee_Id and Employee_Name
  const setEmployeeInfo = (id: any, name: any) => {
    setEmployee_Id(id);
    setEmployee_Name(name);
  };

  const [Employee_Id, setEmployee_Id] = useState("");
  const [Employee_Name, setEmployee_Name] = useState("");

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <locateContext.Provider
        value={{
          EmployeeId: Employee_Id,
          EmployeeName: Employee_Name,
          formDataLaptop: formDataLaptop,
          setFormDataLaptop: setFormDataLaptop,
          userFormImage: userFormImage,
          setUserFormImage: setUserFormImage,
          formDataEmployee: formDataEmployee,
          setFormDataEmployee: setFormDataEmployee,
          formDataCheckBox: formDataCheckBox,
          setFormDataCheckBox: setFormDataCheckBox,
          currentDate: currentDate,
          setCurrentDate: setCurrentDate,
          showLabel: showLabel,
          setShowLabel: setShowLabel,
          capturedImages: capturedImages,
          setCapturedImages: setCapturedImages,
          // extractEmployeeInfo :extractEmployeeInfo ,
        }}
      >
        <Routes>
          {/* <Route path="/get" element={<GetData />} /> */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/post" element={<MyForm />} />
          <Route path="/QrReader" element={<Test />} />
          <Route path="/LaptopDetails" element={<LaptopDetails />} />
          <Route path="/WebCamCapture" element={<WebcamCapture />} />
          <Route path="/FormWithCheckbox" element={<FormWithCheckbox />} />
          <Route path="/ThankyouPage" element={<ThankyouPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/ExitCheckBox" element={<ExitCheckBox />} />
          <Route path="/ThankYouExit" element={<ThankYouExit />} />
          <Route path="/SecurityLogin" element={<SecurityLogin />} />
          <Route path="/StandardListImage" element={<StandardListImage />} />
          {/* <Route path="/StandardListImageExit" element={<StandardListImageExit />} /> */}
          <Route
            path="/MultipleImageCapture"
            element={<MultipleImageCapture />}
          />
        </Routes>
      </locateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
