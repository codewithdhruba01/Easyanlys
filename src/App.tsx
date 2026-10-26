import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';



import FollowerCounter from './pages/FollowerCounter';
import FollowingAnalysis from './pages/FollowingAnalysis';
import ProfileCompare from './pages/ProfileCompare';
import ReadmeDesigner from './pages/ReadmeDesigner';
import TextToReadme from './pages/TextToReadme';

import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />



              <Route path="/follower-counter" element={<FollowerCounter />} />
              <Route path="/following-analysis" element={<FollowingAnalysis />} />
              <Route path="/profile-compare" element={<ProfileCompare />} />
              <Route path="/readme-designer" element={<ReadmeDesigner />} />
              <Route path="/text-to-readme" element={<TextToReadme />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
