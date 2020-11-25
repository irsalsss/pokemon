import React from 'react';
import Button from '../components/shared/Button';
import TitlePage from '../components/shared/TitlePage';

const ErrorPage = () => {
  return (
    <div className='container-error-page flex-column-center'>
      <TitlePage title='Something went wrong' />
      <Button onClick={() => { window.location.href = '/' }}>
        Back to homepage
      </Button>
    </div>
  )
}

export default ErrorPage