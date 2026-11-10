import React, { useContext, useEffect, useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Context } from "./Context/ContextAPI";
import { Skeleton } from "boneyard-js/react";
function SignIn() {
  const { users } = useContext(Context);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  function handleSubmit() {
    console.log(formData.email, formData.password);
    console.log(users);
    const matchedUser = users.find(
      (user) =>
        user.Email === formData.email && user.Password === formData.password,
    );
    if (matchedUser) {
      navigate("/main");
    } else {
      alert("Invalid Passwod or Email");
    }
  }
  useEffect(() => {
    console.log(users);
  }, []);
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
          data-no-skeleton
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
            <Typography variant="h5">Login In</Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", pt: 4, gap: 1 }}
            >
              <Typography variant="caption">Welcome Back!</Typography>
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter Password"
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
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", sm: "80%" },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(!checked)}
                    size="small"
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.8rem",
                  },
                }}
                label="Remember me"
              />
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => alert("Forgot Password Clicked")}
              >
                Forgot Password
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: "green", width: { xs: "100%", sm: "80%" } }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            {/* Form */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
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
              Don't have an Account?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "green",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignIn;
