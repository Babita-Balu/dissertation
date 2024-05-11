import { useState, useEffect } from 'react';
import axios from 'axios';

function HTMLRenderer() {
  const [originalHtmlContent, setOriginalHtmlContent] = useState('');
  const [modifiedHtmlContent, setModifiedHtmlContent] = useState('');
  const [imageIds, setImageIds] = useState([]);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [isHtmlRendererVisible, setHtmlRendererVisible] = useState(true);
  const [isJsonFileInputVisible, setJsonFileInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attach event listeners to images when original HTML content changes
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
      img.addEventListener('mouseenter', () => {
        img.setAttribute('style', 'cursor: pointer; width: 100%;');
        img.setAttribute(
          'title',
          'Click on image and image will be assigned a unique ID'
        );
        // Show tooltip on hover
        setHoveredImageId(img.getAttribute('id'));
      });

      img.addEventListener('mouseleave', () => {
        // Hide tooltip when mouse leaves the image
        setHoveredImageId(null);
      });

      img.addEventListener('click', (e) => {
        if (e.target.parentElement.tagName === 'A') {
          e.preventDefault();
        }
        console.log(e.target);
        // Generate a unique ID for the image
        const uniqueId = generateUniqueId();

        // Add the unique ID as an attribute to the clicked image
        // img.setAttribute('data-unique-id', uniqueId);

        // Update the array of image IDs
        setImageIds([...imageIds, uniqueId]);

        // Show text over the selected image
        setSelectedImageId(uniqueId);

        // Update the modified HTML content with the new ID
        let modifiedContent = originalHtmlContent;
        const tempElement = document.createElement('div');
        tempElement.innerHTML = modifiedContent;

        const imageToUpdate = tempElement.querySelector(
          `img[src="${img.getAttribute('src')}"]`
        );

        if (imageToUpdate) {
          imageToUpdate.setAttribute('id', uniqueId);
          modifiedContent = tempElement.innerHTML;
          setModifiedHtmlContent(modifiedContent);
        }
      });
    });

    // Clean up event listeners when component unmounts
    return () => {
      images.forEach((img) => {
        img.removeEventListener('mouseenter', () => {});
        img.removeEventListener('mouseleave', () => {});
        img.removeEventListener('click', () => {});
      });
    };
  }, [originalHtmlContent, imageIds]);

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Generates a random string
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const content = e.target.result;

        // Set the original HTML content
        setOriginalHtmlContent(content);

        // Set the modified HTML content initially to the same as the original
        setModifiedHtmlContent(content);

        // Upload the original HTML content to the backend
      };

      reader.readAsText(file);
    }
  };

  const handleDoneButtonClick = () => {
    setHtmlRendererVisible(false);
    setJsonFileInputVisible(true);
  };

  const handleJsonFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setJsonFile(file);

      // const reader = new FileReader();

      // reader.onload = async (e) => {
      //   const content = e.target.result;
      //   setJsonFile(content);
      // };

      // reader.readAsText(file);
    }
  };

  const handleCreateDynamicEmail = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('htmlTemplate', modifiedHtmlContent);
      formData.append('productData', jsonFile);
      formData.append('ids', imageIds);

      // const requestBody = {
      //   html: modifiedHtmlContent,
      //   json: jsonFile,
      // };

      const response = await axios.post(
        'http://localhost:5000/api/receive-files',
        formData,
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'text/html' });

      // Create a URL for the Blob data
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger the download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'myFile.html';

      // Append the <a> element to the DOM and trigger the download
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the object URL
      window.URL.revokeObjectURL(url);

      console.log('Response from the backend:');
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      setIsLoading(false);
    }
  };


  return (
    <div className='app-container'>

      {isHtmlRendererVisible && (
        <>
          <h2 style={{ textDecoration: 'underline' }}>Step 1</h2>
          <h3>Upload static HTML template</h3>
          <input type="file" accept=".html" onChange={handleFileChange} />
          <div dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }} />
          {hoveredImageId && <p>Hovered Image ID: {hoveredImageId}</p>}
          {imageIds.length > 0 && (
            <div>
              <p>Image IDs:</p>
              <ul>
                {imageIds.map((id, index) => (
                  <li key={index}>{id}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedImageId && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                background: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Image {selectedImageId} is selected
            </div>
          )}
          {imageIds.length > 0 && (
            <button onClick={handleDoneButtonClick}>Done</button>
          )}
        </>
      )}
      {isJsonFileInputVisible && (
        <>
          <h2 style={{ textDecoration: 'underline' }}>Step 2</h2>
          <h3>Upload JSON</h3>
          <span style={{display: 'flex', justifyContent: 'space-between'}}>
             <input type="file" accept=".json" onChange={handleJsonFileChange}/>
              <a href={'/product.json'} download>Download Sample Product JSON data</a>
          </span>

        </>
      )}
      {jsonFile && modifiedHtmlContent && (
          <>
          <button onClick={handleCreateDynamicEmail}>Create Dynamic Email</button>
          {isLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
        </>
      )}
    </div>
  );
}

export default HTMLRenderer;
