export const textFieldStyles = {
  width: '100%',
  '& .MuiFormLabel-root': {
    padding: '4px 6px',
    color: '#92a4d1',
    '&.Mui-focused': {
      color: '#7b89ab',
    },
  },
  '& .MuiFilledInput-root': {
    backgroundColor: '#4c4d4f',
    '&:hover': {
      backgroundColor: '#4c4d4f',
    },
    '&.Mui-focused': {
      backgroundColor: '#4c4d4f',
    },
  },
  '& .MuiFilledInput-input': {
    height: '30px',
    paddingLeft: '16px',
    color: '#caced9',
    fontSize: '16px',
    '&::placeholder': {
      color: '#92a4d1',
      opacity: 0.7,
    },
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'grey.300',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#7b89ab',
  },
  '&:hover .MuiFilledInput-underline:before': {
    borderBottomColor: 'grey.400',
  },
};
