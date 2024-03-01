const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Could not load data");

    const info = await res.json();
    const status = res.status;
    console.error(info, status);

    // return error;
    return res.json();
  }
  return res.json();
};

export default fetcher;
