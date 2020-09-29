import React from 'react';
import { ErrorForm } from 'components/base/error';

class AppErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('에러가 발생했습니다.');
    const errorData = {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
    };
    console.log(errorData.error, errorData.errorInfo);
    this.setState(errorData);
    // You can also log error messages to an error reporting service here
    // apiRequest({error, errorInfo.componentStack})
  }

  render() {
    // console.log(this.state.error, 'this.state.error');
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      // Error path
      return (
        <>
          <ErrorForm
            code="Error"
            infoText={
              'The server encountered an misconfiguration and was unable to complete your request.'
            }
          />
          {/* {error && (
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <p>{error}</p>
              <p>{errorInfo}</p>
            </div>
          )} */}
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default AppErrorBoundary;
