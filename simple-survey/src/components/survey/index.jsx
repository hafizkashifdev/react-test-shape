import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Grid,
  Typography,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  Box,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { Formik, Form } from "formik";
import "./survey.css";
import uparrowImg from "../../assets/upper-arrow.svg";
import useSurvey from "./useSurvey";

const Survey = () => {
  const {
    selectedButtonOption,
    selectedListOption,
    handleInputChange,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    touched,
    errors,
    surveyData,
    handleSaveSurvey,
    handleButtonInputChange,
  } = useSurvey();

  const handleSubmit = ({ setSubmitting }) => {
    handleSaveSurvey();
    setSubmitting(false);
  };

  return !surveyData.length ? (
    <LinearProgress color="secondary" />
  ) : (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      <Form>
        <Container maxWidth="md" sx={{ position: "relative", px: 0 }}>
          <Grid
            container
            spacing={2}
            className="survey-container"
            sx={{
              mt: { xl: -30, md: -10, xs: 2 },
              mb: 2,
              bgcolor: "rgb(112 87 108)",
              p: 4,
              border: "1px solid black",
            }}
          >
            {surveyData.map((question) => (
              <Grid key={question.id} item xs={12} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    className={`question-id ${
                      touched[question.id] && errors[question.id]
                        ? "error-text"
                        : ""
                    }`}
                  >
                    {question.id}
                  </Typography>
                  <Typography
                    variant="h6"
                    className={`question-title ${
                      touched[question.id] && errors[question.id]
                        ? "error-text"
                        : ""
                    }`}
                    sx={{ marginLeft: 1 }}
                  >
                    {question.title}
                  </Typography>
                  {question.id === 2 && (
                    <Tooltip title="Your Date of
                    birth is required
                    to accurately
                    calculate your
                    health age." placement="top">
                      <ErrorOutlineIcon
                        sx={{
                          ml: 1,
                          color:
                            touched[question.id] && errors[question.id]
                              ? "#d32f2f"
                              : "black",
                          transform: "rotate(180deg)",
                        }}
                      />
                    </Tooltip>
                  )}
                  {question.id === 4 && (
                    <Tooltip title="Your Date of
                    birth is required
                    to accurately
                    calculate your
                    health age." placement="top">
                      <ErrorOutlineIcon
                        sx={{
                          ml: 1,
                          color:
                            touched[question.id] && errors[question.id]
                              ? "#d32f2f"
                              : "black",
                          transform: "rotate(180deg)",
                        }}
                      />
                    </Tooltip>
                  )}
                </Box>
                {question.questionType === "Dropdown" && (
                  <Select
                    fullWidth
                    value={values[question.id] || ""}
                    name={`${question.id}`}
                    onChange={(e) => {
                      handleInputChange(question.id, e.target.value);
                      setFieldValue(question.id, e.target.value);
                    }}
                    style={{ borderRadius: "8px" }}
                  >
                    {question.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                {question.questionType === "Input field" && (
                  <>
                    {question.options.map((option, index) => (
                      <TextField
                        key={option.label}
                        label={option.label}
                        type={option.type}
                        value={values[question.id]?.[option.label] || ""}
                        onBlur={handleBlur}
                        name={`${question.id}.${option.label}`}
                        onChange={handleChange}
                        helperText={
                          (touched[question.id]?.[option.label] ||
                            values[question.id]?.[option.label]) &&
                          errors[question.id]?.[option.label]
                        }
                        error={Boolean(errors[question.id]?.[option.label])}
                        InputProps={{
                          sx: {
                            borderRadius: "28px",
                            marginRight: 2,
                            mb: 2,
                          },
                        }}
                      />
                    ))}
                  </>
                )}

                {question.questionType === "Button" && (
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {question.options.map((option, index) => (
                      <Grid item sm={2} xs={4} key={option}>
                        <Box
                          onClick={() =>
                            handleButtonInputChange(question.id, option)
                          }
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          className={`option-circle ${
                            touched[question.id] && errors[question.id]
                              ? "error-text"
                              : ""
                          }`}
                          sx={{
                            backgroundColor:
                              selectedButtonOption === option
                                ? "#fff"
                                : "rgb(146 125 142)",
                            border:
                              selectedButtonOption === option
                                ? "3px solid #fff"
                                : "3px solid rgb(146 125 142)",
                          }}
                        >
                          {option}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {question.questionType === "Free text input field" && (
                  <>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={values[question.id] || ""}
                      onBlur={handleBlur}
                      name={`${question.id}`}
                      onChange={handleChange}
                      helperText={touched[question.id] && errors[question.id]}
                      error={Boolean(errors[question.id])}
                      InputProps={{
                        sx: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </>
                )}

                {question.questionType === "list" && (
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    {question.options.map((option, index) => (
                      <Grid item sm={8} xs={11} key={option.label}>
                        <Box
                          onClick={() =>
                            handleInputChange(question.id, option.label, false)
                          }
                          className="square-box"
                          sx={{
                            border:
                              selectedListOption === option.label
                                ? "3px solid #fff"
                                : "3px solid rgb(146 125 142)",
                            background:
                              selectedListOption === option.label
                                ? "#fff"
                                : "rgb(146 125 142)",
                            width: { sm: "440px", xs: "100%" },
                          }}
                        >
                          <Box className="squareOption" sx={{ ml: 1 }}>
                            {option.label}
                          </Box>
                          <Box sx={{ ml: 2 }}>{option.category}</Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            ))}
            <Grid item xs={12} sx={{ p: 2 }}>
              <Button
                type="submit"
                sx={{
                  bgcolor: "rgb(146 125 142)",
                  color: "#fff",

                  "&:hover": {
                    bgcolor: "#fff",
                    color: "rgb(146 125 142)",
                  },
                }}
              >
                Save Survey
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xxl">
          <Box
            sx={{
              display: { lg: "flex", xs: "none" },
              pr: "50px",
              position: "relative",
            }}
          >
            <img
              src={uparrowImg}
              alt="img"
              style={{
                position: "absolute",
                left: 40,
                top: -170,
              }}
            ></img>
          </Box>
        </Container>
      </Form>
    </Formik>
  );
};

export default Survey;
