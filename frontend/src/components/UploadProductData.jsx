import { useState } from 'react';

function UploadProductData() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append('file', file);

    // Send formData to the server using fetch or another HTTP library
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Handle the response from the server
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="text/json" />
        <button type="submit">Upload product data</button>
      </form>
    </div>
  );
}

export default UploadProductData;
