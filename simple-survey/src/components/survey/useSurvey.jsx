// useSurvey.js
import { useState, useEffect } from 'react';
import { surveySchema } from '../../utils/validationSchemas';
import { useFormik } from 'formik';
import { fetchData } from '../../utils/api';

const useSurvey = () => {
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState([]);
  const [surveyResponses, setSurveyResponses] = useState({});
  const [selectedButtonOption, setSelectedButtonOption] = useState(null);
  const [selectedListOption, setSelectedListOption] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const data = await fetchData();
        setSurveyData(data);
        console.log('Fetched Data:', data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  const handleInputChange = (questionId, option, isButton = true) => {
    if (formik.isSubmitting) {
      return;
    }

    const questionType = surveyData.find((q) => q.id === questionId)?.questionType;

    if (questionType === 'Button' && isButton) {
      setSelectedButtonOption(option || null);
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: { option },
      }));
      formik.setFieldError(questionId, '');
    } else if (questionType === 'list' && !isButton) {
      setSelectedListOption(option || '');
      setSurveyResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: { option },
      }));
      formik.setFieldError(questionId, '');
    }
  };

  const handleButtonInputChange = (questionId, option) => {
    setSelectedButtonOption(option);
    setSurveyResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: { option },
    }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await surveySchema.validate(values, { abortEarly: false });

      const dateValues = {
        DD: parseInt(values.fields.DD, 10) || "",
        MM: parseInt(values.fields.MM, 10) || "",
        YYYY: parseInt(values.fields.YYYY, 10) || "",
      };

      const submittedValues = {
        1: surveyResponses['1']?.option || '',
        2: dateValues,
        3: surveyResponses['3']?.option || '',
        4: surveyResponses['4']?.option || '',
        5: surveyResponses['5']?.option || '',
      };

      console.log("Form submitted:", JSON.stringify(submittedValues, null, 2));

      setSelectedButtonOption(null);
      setSelectedListOption(null);
      setSurveyResponses({});

      formik.resetForm();
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveSurvey = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.submitForm();
        console.log("Form submitted:", formik.values);
      } else {
        console.error("Validation failed:", errors);
      }
    });
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
    onSubmit: handleSubmit,
  });

  const {
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    touched,
    errors,
  } = formik;

  return {
    surveyResponses,
    selectedButtonOption,   
    selectedListOption,
    handleInputChange,
    handleChange,
    handleBlur,
    handleSubmit: formik.handleSubmit,
    values,
    setFieldValue,
    handleSaveSurvey,
    touched,
    errors,
    surveyData,
    setSelectedListOption,
    handleButtonInputChange,
  };
};

export default useSurvey;
