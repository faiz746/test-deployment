import { React, useCallback, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import img1 from "../assets/gettingstartedImg.svg";
import img2 from "../assets/gettingStartedLogo.png";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Context } from "./Context/ContextAPI";

function SignUp() {
  const navigate = useNavigate();
  const specialCharRegex = /[^a-zA-Z0-9]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;
  const { users, setUsers } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    confirmPassword: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [passwordError, setPasswordError] = useState({
    lengthError: "",
    specialCharError: "",
    uppercaseError: "",
    lowercaseError: "",
    numberError: "",
  });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (formData.password.length < 1) {
      setIsCorrect(true);
    }
  }, [formData.password]);
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
  }, [users]);
  function handleSubmit() {
    alert("Submit Button Pressed");
    if (formData.confirmPassword != formData.password) {
      alert("Passwords doesn't matches");
    } else {
      const correctPassword = Object.values(passwordError).every(
        (val) => val === ""
      );
      console.log(correctPassword);
      if (correctPassword) {
        const data = {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
        };
        console.log(users);
        setUsers([...users, data]);
        navigate("/signin");
      } else {
        alert("Please Enter a Correct Password");
      }
    }
  }

  function handlePasswordChange(e) {
    const changedPassword = e.target.value;
    setFormData((prev) => ({ ...prev, password: changedPassword }));

    const newErrors = {
      lengthError: "",
      lowercaseError: "",
      numberError: "",
      uppercaseError: "",
      specialCharError: "",
    };

    let isValid = true;

    if (changedPassword.length > 0 && changedPassword.length < 8) {
      newErrors.lengthError = "Password must be at least 8 characters long";
      isValid = false;
    }
    if (changedPassword.length > 0 && !lowercaseRegex.test(changedPassword)) {
      newErrors.lowercaseError =
        "Password should contain at least one lowercase letter";
      isValid = false;
    }
    if (changedPassword.length > 0 && !numberRegex.test(changedPassword)) {
      newErrors.numberError = "Password should contain at least one number";
      isValid = false;
    }
    if (changedPassword.length > 0 && !uppercaseRegex.test(changedPassword)) {
      newErrors.uppercaseError =
        "Password should contain at least one uppercase letter";
      isValid = false;
    }
    if (changedPassword.length > 0 && !specialCharRegex.test(changedPassword)) {
      newErrors.specialCharError =
        "Password should contain at least one special character";
      isValid = false;
    }

    setPasswordError((prev) => ({ ...prev, ...newErrors }));
    setIsCorrect(isValid);
  }

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "auto" }}>
        <Box
          sx={{
            p: 2,
            width: { xs: "0%", sm: "50%" },
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            alignItems: "center",
            //ustifyContent: "center",
            gap: 4,
            py: 4,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "green",
              fontSize: { xs: "0.6rem", md: "1rem", lg: "1.5rem" },
            }}
          >
            Manage Your Gemstones Business Online!
          </Typography>
          <img src={img1} alt="Gemstones" width={"60%"} />
        </Box>
        <Box
          sx={{
            p: { xs: 2, md: 2, lg: 4 },
            px: { xs: 0 },
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <img src={img2} alt="" />
          <Box
            component="form"
            sx={{
              p: 2,
              fontWeight: 900,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5">Sign Up</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  width: { xs: "100%", sm: "80%" },
                }}
              >
                Join hundreds of GemExhibit users around the globe manage your
                business with ease
              </Typography>
              <InputLabel sx={{ fontSize: "0.8rem" }}>Full Name</InputLabel>
              <TextField
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                sx={{
                  input: { fontSize: "0.8rem" },
                  width: { xs: "100%", sm: "80%" },
                }}
                placeholder="Enter Name"
                size="small"
              />
              <InputLabel sx={{ fontSize: "0.8rem" }}>Email Adress</InputLabel>
              <TextField
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                sx={{
                  input: { fontSize: "0.8rem" },
                  width: { xs: "100%", sm: "80%" },
                }}
                placeholder="Enter Email"
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel sx={{ fontSize: "0.8rem" }}>Password</InputLabel>
              <TextField
                type={showPassword ? "text" : "password"} // also updated for toggle effect
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                sx={{
                  input: { fontSize: "0.8rem" },
                  width: { xs: "100%", sm: "80%" },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: isCorrect ? "" : "red",
                  },
                }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <ul>
                {passwordError.lengthError && (
                  <Typography
                    component="li"
                    sx={{
                      fontSize: "0.7rem",
                      color: "red",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {passwordError.lengthError}
                  </Typography>
                )}
                {passwordError.lowercaseError && (
                  <Typography
                    component="li"
                    sx={{
                      fontSize: "0.7rem",
                      color: "red",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {passwordError.lowercaseError}
                  </Typography>
                )}
                {passwordError.uppercaseError && (
                  <Typography
                    component="li"
                    sx={{
                      fontSize: "0.7rem",
                      color: "red",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {passwordError.uppercaseError}
                  </Typography>
                )}
                {passwordError.specialCharError && (
                  <Typography
                    component="li"
                    sx={{
                      fontSize: "0.7rem",
                      color: "red",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {passwordError.specialCharError}
                  </Typography>
                )}

                {passwordError.numberError && (
                  <Typography
                    component="li"
                    sx={{
                      fontSize: "0.7rem",
                      color: "red",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                  >
                    {passwordError.numberError}
                  </Typography>
                )}
              </ul>

              <InputLabel sx={{ fontSize: "0.8rem" }}>
                Confirm Password
              </InputLabel>
              <TextField
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Enter Confirm Password"
                sx={{
                  input: { fontSize: "0.8rem" },
                  width: { xs: "100%", sm: "80%" },
                }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", sm: "80%" },
              }}
            ></Box>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: "green", width: { xs: "100%", sm: "80%" } }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {/* Form */}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "80%" },
              justifyContent: "center",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
              }}
            >
              Already Have an Account?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "green",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
