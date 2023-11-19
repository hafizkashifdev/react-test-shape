// validationSchemas.js
import * as yup from 'yup';

const dateSchema = yup.object().shape({
  DD: yup.number().typeError('DD must be a number').min(1, 'DD must be at least 1').max(31, 'DD must be at most 31').required('This field is required'),
  MM: yup.number().typeError('MM must be a number').min(1, 'MM must be at least 1').max(12, 'MM must be at most 12').required('This field is required'),
  YYYY: yup.number().typeError('YYYY must be a number').min(1920, 'YYYY must be at least 1920').max(2006, 'YYYY must be at most 2006').required('This field is required'),
});

const textFieldSchema = yup.string().max(250, 'Field must be at most 250 characters').required('This field is required');

export const surveySchema = yup.object().shape({
  1: yup.string().notRequired(),
  2: dateSchema,
  4: textFieldSchema,
  3: yup.string().notRequired(),
  5: yup.string().notRequired(),
});
