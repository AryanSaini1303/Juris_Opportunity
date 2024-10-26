"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


// Function to upload a file to the Supabase bucket and return its public URL
const uploadFile = async (file) => {
  const filePath = `events/${file.name}`; // Adjust the path as needed

  // Upload the file
  const { data, error } = await supabase.storage
    .from("event_files") // Replace with your bucket name
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading file:", error);
    return null;
  }

  // Get the public URL for the uploaded file
  const { data:publicURL, error: urlError } = supabase.storage
    .from("event_files")
    .getPublicUrl(filePath);

  if (urlError) {
    console.error("Error getting file URL:", urlError);
    return null;
  }
  console.log("URL: ", publicURL);
  return publicURL; // Return the public URL of the uploaded file
};

// Function to store the file URL in the database along with the user ID
const storeFileURLInDatabase = async (url) => {
  const { data: { user }, error } = await supabase.auth.getUser(); // Get the authenticated user
  console.log(user);

  if (error) {
    console.error("Error getting user:", error);
    return; // Prevent further execution
  }

  if (!user) {
    console.error("User is not authenticated");
    return; // Prevent further execution
  }

  const { data, error: insertError } = await supabase
    .from("demo_table") // Replace with your table name
    .insert([{ file_url: url, id: 2 }]); // Assuming you have a user_id field

  if (insertError) {
    console.error("Error storing file URL:", insertError);
  } else {
    console.log("File URL stored successfully:", data);
  }
};

const Home = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [isSignedIn, setIsSignedIn] = useState(false); // State to track sign-in status

  useEffect(() => {
    const fetchData = async () => {
      const { data: events, error } = await supabase
        .from("demo_table") // Replace with your table name
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", events);
        setData(events);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    // Step 1: Upload the file
    const fileUrl = await uploadFile(file);
    if (fileUrl) {
      // Step 2: Store the file URL in the database
      await storeFileURLInDatabase(fileUrl);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent form submission
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("Signed in successfully:", data);
      setIsSignedIn(true); // Update sign-in status
    }
  };

  return (
    <div>
      <h1>Events</h1>

      {!isSignedIn ? (
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <>
          <ul>
            {data.map((event) => (
              <li key={event.id}>{event.events}</li>
            ))}
          </ul>
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
