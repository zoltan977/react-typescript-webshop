import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FC } from 'react';

interface StepperLabelsProps {
    props: {
        activeStep: number;
        stepLabels: string[];
        isStepFailed: Record<number, boolean>;
    }
}

const StepperLabels: FC<StepperLabelsProps> = ({props}) => {
  return (
    <Stepper activeStep={props.activeStep}>
        {props.stepLabels.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (props.isStepFailed[index]) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Ki kell tölteni!
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
  )
}

export default StepperLabels