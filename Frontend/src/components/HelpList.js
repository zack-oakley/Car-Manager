import React, { useEffect, useState } from 'react';

function HelpList() {
   
    const [issues, setIssues] = useState([]);


    // Retrieve the entire list of issues
    const loadIssues = async () => {
        const response = await fetch('/issues');
        const issues = await response.json();
        setIssues(issues);
    }


    // LOAD all the issues
        useEffect(() => {
            loadIssues();
        }, []);


 // DISPLAY the issues WILL FIX THE ADD BUTTON LATER
    return (
    <section>
      <h3>Reported Issues</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default HelpList;
