import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for programmatic navigation

export default function Header() {
  const navigate = useNavigate(); // Initialize the navigate function for routing

  return (
    <div>
      {/* Navigation bar */}
      <nav className="flex justify-between px-20 py-10 items-center bg-white">
        {/* Logo or heading text */}
        <h1
          onClick={() => navigate("")} // Navigate to the home page when the heading is clicked
          className="mb-4 text-3xl font-extrabold text-gray-90 dark:text-blue
         md:text-3xl lg:text-4xl text-left ml-4 mt-5 cursor-pointer"
        >
          {/* Styled heading text with gradient effect */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            XOGENE
          </span>{" "}
          Assessment
        </h1>
      </nav>
    </div>
  );
}
