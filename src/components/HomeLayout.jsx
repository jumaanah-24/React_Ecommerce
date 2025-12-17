import { Outlet, Link } from "react-router";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">TodaysHop</h1>
          <div className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1 max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white text-center p-3">
         {new Date().getFullYear()} TodaysHop. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
