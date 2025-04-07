import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">University System</Link>
        <div className="space-x-4">
          <Link to="/degrees" className="hover:underline">Degrees</Link>
          <Link to="/cohorts" className="hover:underline">Cohorts</Link>
          <Link to="/modules" className="hover:underline">Modules</Link>
        </div>
      </div>
    </nav>
  );
}