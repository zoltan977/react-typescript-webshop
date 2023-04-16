import { Box, Button } from '@mui/material'
import { FC } from 'react'

interface StepperButtonProps {
    props: {
        activeStep: number;
        handleBack: () => void;
        handleNext: () => void;
        isStepFailed: Record<number, boolean>;
        stepLabels: string[];
    }
}

const StepperButtons:FC<StepperButtonProps> = ({props}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
        >
          Vissza
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button 
          onClick={props.handleNext} 
          disabled={props.isStepFailed[props.activeStep]}
        >
          {props.activeStep === props.stepLabels.length - 1 ? 'Elküld' : 'Következő'}
        </Button>
    </Box>
  )
}

export default StepperButtons