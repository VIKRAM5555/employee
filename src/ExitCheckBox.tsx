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
import { useFrappeGetDocList } from "frappe-react-sdk";
import { StandardListImageExit } from "./StandardListImageExit";
import { ImageList, ImageListItem } from "@mui/material";
const ExitCheckBox = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    // currentDate,
    userFormImage,
  }: any = useContext(locateContext);

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

  const handleOtherTextChange = (e: any) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    handleCreateDoc();

    navigate("/ThankYouExit");
    setTimeout(() => {
      navigate("/WelcomePage");
    }, 2000);
  };

  const { createDoc } = useFrappeCreateDoc();

  const handleCreateDoc = async () => {
    const formLaptop = {
      title: "d1", // Example title
      // name: userForm.user_name,
      employee_number: formDataLaptop.laptopSerialNumber,
      employment_type: formDataLaptop.laptopBrand,

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
    };
    console.log(currentDate);
    try {
      // await createDoc("NewDoctypefromOld ", formLaptop);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc:", error);
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
      employee: formDataEmployee.name,
      attendance_date: currentDate,
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

  const { data }: any = useFrappeGetDocList("NewDoctypefromOld", {
    fields: ["carry", "imagelist6", "date", "location"],
    filters: [
      ["id", "=", JSON.parse(localStorage.formdata)["id"]],
      ["date", "=", currentDate],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log("ExitCheckBox", data);

  // const itemsArray = data?.map((item) => item.carry.split(", ")).flat();
  const itemsArray = data?.[0].carry.split(",");
  const itemsArrayImage = data?.[0].imagelist6.split("|lak|") || [];

  console.log(".........", itemsArrayImage);
  const Location = data?.[0].location;
  return (
    <>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <h2>Confiscated Items:</h2>
        <ImageList cols={2} rowHeight={300}>
          {itemsArrayImage?.map((item: any, index: any) => (
            <ImageListItem className={"imagelist"} key={index}>
              <img src={item} alt={`item-${index}`} />
            </ImageListItem>
          ))}
        </ImageList>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            {itemsArray?.length === 1 ? (
              <></>
            ) : (
              itemsArray?.map((item: any, index: any) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={formDataCheckBox[item]}
                      onChange={() =>
                        handleCheckboxChange({
                          target: {
                            name: item,
                            checked: !formDataCheckBox[item],
                          },
                        })
                      }
                      name={item}
                    />
                  }
                  label={item}
                />
              ))
            )}
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
          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Location"
              variant="outlined"
              name="name"
              value={Location}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Return
          </Button>
        </form>
      </Container>
    </>
    // <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
    //   <h2>Select Items:</h2>
    //   <form onSubmit={handleSubmit}>
    //     {data?.map((item) => (
    //       <div>{item}</div>
    //     ))}
    //     {/* <FormGroup>
    //       {data?.map((item) => (
    //         <FormControlLabel
    //           key={item.id} // Assuming 'id' is a unique identifier for each item
    //           control={
    //             <Checkbox
    //               checked={formDataCheckBox[item.name]}
    //               onChange={() => handleCheckboxChange(item.name)}
    //               name={item.name}
    //             />
    //           }
    //           label={item.name}
    //         />
    //       ))}
    //     </FormGroup>

    //     {/* {formDataCheckBox.others && (
    //       <TextField
    //         label="Other Items"
    //         variant="outlined"
    //         name="otherText"
    //         value={formDataCheckBox.otherText}
    //         onChange={handleOtherTextChange}
    //         fullWidth
    //         style={{ marginTop: "16px" }}
    //       />
    //     )} */}

    //     {/* <Button
    //       type="submit"
    //       variant="contained"
    //       color="primary"
    //       style={{ marginTop: "16px" }}
    //     >
    //       Submit
    //     </Button> */}
    //   </form>
    // </Container>
  );
};

export default ExitCheckBox;
