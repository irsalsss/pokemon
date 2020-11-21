import React from 'react';
import Button from '../components/shared/Button';

const ErrorPage = () => {
  return (
    <div className='container-error-page flex-column-center'>
      <h2 className='title-page'>Something went wrong</h2>
      <Button onClick={() => { window.location.href = '/' }}>
        Back to homepage
      </Button>
    </div>
  )
}

export default ErrorPage