export default function demoIframe({ src }) {
  return (
    <iframe
      src={src}
      className="w-full border-0 rounded-sm overflow-hidden"
      style={{ height: "500px" }}
    ></iframe>
  );
}
