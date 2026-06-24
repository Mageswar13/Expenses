// src/components/Footer.jsx
function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="app-footer">
        <p>&copy; {year} Expense Tracker. All rights reserved.</p>
      </footer>
    );
  }
  
  export default Footer;