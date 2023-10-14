//import { useState } from "react";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MultipleImageCapture } from "./MultipleImageCapture";
const FormWithCheckbox: React.FC = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    // currentDate,
    userFormImage,
    capturedImages,
  }: any = useContext(locateContext);

  // const [formDataCheckBox, setFormDataCheckBox] = useState({
  //   laptop: false,
  //   pendrive: false,
  //   hardDisk: false,
  //   bluetooth: false,
  //   others: false,
  //   otherText: "",
  // });

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      setFormDataCheckBox({
        ...formDataCheckBox,
        laptop: checked,
        pendrive: checked,
        hardDisk: checked,
        bluetooth: checked,
      });
    } else {
      setFormDataCheckBox({
        ...formDataCheckBox,
        [name]: checked,
      });
    }
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  // const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setFormDataCheckBox({
  //     ...formDataCheckBox,
  //     otherText: value,
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    handleCreateDoc();
    handleCreateAttendance();
    navigate("/ThankyouPage");
    setTimeout(() => {
      navigate("/WelcomePage");
    }, 2000);
  };

  const { createDoc } = useFrappeCreateDoc();

  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

    const formLaptop = {
      title: "d1", // Example title
      // name: userForm.user_name,
      employee_number: formDataLaptop.laptopSerialNumber,
      employment_type: formDataLaptop.laptopBrand,
      location: formDataLaptop.laptopLocation,
      user_name: JSON.parse(localStorage.formdata)["name"],
      id: JSON.parse(localStorage.formdata)["id"],
      time: getCurrentTime(),
      image: userFormImage.image,
      carry: Object.keys(formDataCheckBox)
        .filter((item) => item !== "otherText" && formDataCheckBox[item])
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .concat(formDataCheckBox.others ? [formDataCheckBox.otherText] : [])
        .join(", "),
      date: currentDate,

      imagelist6: capturedImages
        .map((item: CapturedImage) => item.imageSrc)
        .join("|lak|"),
    };
    console.log("Capture", capturedImages);
    console.log("formLaptop", formLaptop);
    try {
      await createDoc("NewDoctypefromOld ", formLaptop);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);
  const handleCreateAttendance = async () => {
    const formAttendance = {
      title: "d1", // Example title
      // name: userForm.user_name,
      employee: JSON.parse(localStorage.formdata)["name"],
      attendance_date: currentDate,
      start_time: getCurrentTime(),
    };
    console.log(currentDate);
    try {
      await createDoc("Attendance", formAttendance);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc:", error);
    }
  };
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const selectNone = () => {
    setFormDataCheckBox({
      laptop: false,
      pendrive: false,
      hardDisk: false,
      bluetooth: false,
      others: false,
      otherText: "",
    });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <MultipleImageCapture />
      <h2>
        <b>Confiscated Items:</b>
      </h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formDataCheckBox.laptop &&
                  formDataCheckBox.pendrive &&
                  formDataCheckBox.hardDisk &&
                  formDataCheckBox.bluetooth &&
                  formDataCheckBox.others
                }
                onChange={handleCheckboxChange}
                name="selectAll"
              />
            }
            label="Select All"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.laptop}
                onChange={handleCheckboxChange}
                name="laptop"
              />
            }
            label="Laptop"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.pendrive}
                onChange={handleCheckboxChange}
                name="pendrive"
              />
            }
            label="Pendrive"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.hardDisk}
                onChange={handleCheckboxChange}
                name="hardDisk"
              />
            }
            label="Hard Disk"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.bluetooth}
                onChange={handleCheckboxChange}
                name="bluetooth"
              />
            }
            label="Bluetooth"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.others}
                onChange={handleCheckboxChange}
                name="others"
              />
            }
            label="Others"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  !formDataCheckBox.laptop &&
                  !formDataCheckBox.pendrive &&
                  !formDataCheckBox.hardDisk &&
                  !formDataCheckBox.bluetooth &&
                  !formDataCheckBox.others
                }
                onChange={selectNone}
                name="none"
              />
            }
            label="None"
          />
        </FormGroup>

        {formDataCheckBox.others && (
          <TextField
            label="Other Items"
            variant="outlined"
            name="otherText"
            value={formDataCheckBox.otherText}
            onChange={handleOtherTextChange}
            fullWidth
            style={{ marginTop: "16px" }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormWithCheckbox;
