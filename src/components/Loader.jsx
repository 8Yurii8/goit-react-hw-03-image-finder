import React from 'react';

import { MagnifyingGlass, ProgressBar } from 'react-loader-spinner';

export function Loader() {
  return (
    <MagnifyingGlass
      visible={true}
      height={200}
      width={1000}
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
}

export function LoaderMore() {
  return (
    <ProgressBar
      height="200"
      width="1000"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#F4442E"
      barColor="#51E5FF"
    />
  );
}
