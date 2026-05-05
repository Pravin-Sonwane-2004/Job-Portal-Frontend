// Loader shows a reusable loading spinner while pages or API data are still loading.
export default function Loader() {
  // This small component is reused whenever a page is waiting for data.
  return (
    // The outer wrapper lets CSS center the spinner on the page.
    <div className="loader-wrap">
      {/* The spinner is styled completely with CSS. */}
      <div className="spinner" />
    </div>
  );
}
