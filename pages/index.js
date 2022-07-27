import { useState, useEffect } from "react";

export default function Home() {
  const [streamData, setStreamData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");
    eventSource.onmessage = function (event) {
      setStreamData((prevState) => [...prevState, { message: event.data }]);
    };

    eventSource.onerror = function () {
      setStreamData((prevState) => [
        ...prevState,
        { message: "Server Connection Ended" },
      ]);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      {streamData.map((data) => (
        <p key={data.message}>{data.message}</p>
      ))}
    </div>
  );
}
