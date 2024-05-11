/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
// import { useState } from 'react';

import './App.css';
import FileUpload from './components/FileUpload';

function App() {

  return (
    <>
      <h1>Welcome to Interactive Email Generation System</h1>
        <div>
            There are 3 steps involved to generate Interactive Email Template.
            <ul>
                <li><strong>Step 1. Upload static HTML</strong></li>
                <ul>
                    <li>After uploading HTML, it will be displayed on the webpage</li>
                    <li>You will be asked to select any Product Image you wish to make interactive/dynamic</li>
                    <li>Once Clicking on product image, unique ID will be given to that image which will be displayed
                        below the product image
                    </li>
                    <li>Click done and you will be redirected to Step 2.</li>
                </ul>
                <li><strong>Step 2. Upload Product JSON data.</strong></li>
                <ul>
                    <li>Once uploading JSON data, <em><strong>Create Interactive Email</strong></em> button will be displayed</li>
                </ul>
                <li><strong>Step 3. Create Interactive Email</strong></li>
            </ul>
        </div>
        {/* <h2>Upload HTML template</h2> */}
        <FileUpload/>
    </>
  );
}

export default App;
