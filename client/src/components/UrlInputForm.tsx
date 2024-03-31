import React, { useState, FormEvent } from 'react';

const URLInputForm: React.FC = () => {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("URL Submitted: ", url);
    // Here, you can add functionality to do something with the URL
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default URLInputForm;
