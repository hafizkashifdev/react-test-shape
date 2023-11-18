// useSurvey.jsx
import { useState } from 'react';
import surveyData from './surveyData.json';
import { surveySchema } from '../../utils/validationSchemas';
import { useFormik } from "formik";
const useSurvey = () => {
  const [surveyResponses, setSurveyResponses] = useState({});
  const [selectedButtonOption, setSelectedButtonOption] = useState(null);
  const [selectedListOption, setSelectedListOption] = useState(null);
  const [isRequiredFieldMissing, setIsRequiredFieldMissing] = useState(false);
  const handleInputChange = (questionId, option) => {
    setSurveyResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: option,
    }));
  
    const questionType = surveyData.find((q) => q.id === questionId)?.questionType;
  
    if (questionType === 'Button') {
      setSelectedButtonOption(option || null); // Set to null when cleared
    } else if (questionType === 'list') {
      setSelectedListOption(option || ''); // Set to an empty string when cleared
    }
  };
  
  const formik = useFormik({
    initialValues: {
      fields: {
        DD: "",
        MM: "",
        YYYY: "",

      },
    },
    validationSchema: surveySchema,
    onSubmit: async (values) => {
      try {
        // Validate the entire form using yup schema
        await surveySchema.validate(values, { abortEarly: false });

        // Handle form submission
        console.log("Form submitted:", values);

        // Clear the form
        formik.resetForm();

        // You can perform additional actions after successful submission
      } catch (error) {
        // Validation failed, show errors
        const validationErrors = {};
        if (error.inner) {
          error.inner.forEach((e) => {
            validationErrors[e.path] = e.message;
          });
        }

        console.error("Validation failed:", validationErrors);
      }
    },
  });
  

  const checkRequiredFields = () => {
    const isAnyRequiredFieldMissing = surveyData.some((question) => {
      const questionId = question.id;
      const fieldIsRequired = surveySchema.fields[questionId]?._exclusive?.required;
      const fieldValue = formik.values[questionId];
  
      if (fieldIsRequired && fieldValue === undefined) {
        return true;
      }
  
      const questionType = surveyData.find((q) => q.id === questionId)?.questionType;
  
      if (fieldIsRequired && questionType === 'Button' && fieldValue === null) {
        return true;
      }
  
      if (fieldIsRequired && questionType === 'Dropdown' && fieldValue === '') {
        return true;
      }
  
      return false;
    });
  
    setIsRequiredFieldMissing(isAnyRequiredFieldMissing);
  };
  

  const handleSaveSurvey = () => {
    checkRequiredFields();

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0 && !isRequiredFieldMissing) {
        formik.submitForm();
        console.log("Form submitted:", formik.values);
      } else {
        console.error("Validation failed:", errors);
      }
    });
  };
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    touched,
    errors,
  } = formik;
  return {
    isRequiredFieldMissing,
    surveyResponses,
    selectedButtonOption,
    selectedListOption,
    handleInputChange,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    handleSaveSurvey,
    touched,
    errors,
    surveyData,
    setSelectedListOption
  };
};

export default useSurvey;
