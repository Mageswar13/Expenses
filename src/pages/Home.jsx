// src/pages/Home.jsx
import DashboardSummary from "../components/DashboardSummary";
import TransactionForm from "../components/TransactionForm";
import SearchFilter from "../components/SearchFilter";
import TransactionList from "../components/TransactionList";
import CategoryChart from "../components/CategoryChart";
import MonthlyReport from "../components/MonthlyReport";
import Footer from "../components/Footer";

function Home() {
  return (
    <main className="home-page">
      <h1 className="page-title">Expense Tracker</h1>

      <DashboardSummary />

      <div className="home-grid">
        <div className="home-column">
          <TransactionForm />
          <SearchFilter />
          <TransactionList />
        </div>

        <div className="home-column">
          <MonthlyReport />
          <CategoryChart />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Home;