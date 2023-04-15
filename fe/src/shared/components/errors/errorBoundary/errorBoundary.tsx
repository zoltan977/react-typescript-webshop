import React, { Component } from 'react';
import globalErrorHandler from '../../../utils/globalErrorHandler';

export default class ErrorBoundary extends Component<{ children: React.ReactNode }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
  }

  componentDidCatch(error: Readonly<unknown>, errorInfo: Readonly<unknown>): void {
    console.log("Error boundary error, errorInfo: ", error, errorInfo)
    globalErrorHandler(error, errorInfo)
  }

  render(): React.ReactElement | React.ReactNode {
    const { children } = this.props;
    return children;
  }
}