import React from 'react';
import { Link } from 'react-router-dom';

// This component fucntion enables route navigation
function Navigation() {
  return (
    <nav>
        <Link to="../HomePage">Home</Link>
        <Link to="../CarPage">Car Page</Link>
        <Link to="../HelpPage">Help</Link>
    </nav>
  );
}

export default Navigation;