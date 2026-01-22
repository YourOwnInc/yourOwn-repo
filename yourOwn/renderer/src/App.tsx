import {Route }  from 'react-router-dom';


function AppContent() {
    
    return (
        <Route path="/Dashboard" element={<div>Dashboard</div>} />
    )
}

export default function App() {
    return (
        <AppContent />
    )
}