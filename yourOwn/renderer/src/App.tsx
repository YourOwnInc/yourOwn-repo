import {Route }  from 'react-router-dom';


function AppContent() {
    
    return (
        <Route path="/landing" element={<div>landing</div>} />
    )
}

export default function App() {
    return (
        <AppContent />
    )
}