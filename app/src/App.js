import './App.css';
import { Route, Routes } from "react-router-dom";
import { React } from "react";
import ASVSPage from "./pages/ASVSPage";

function App() {
  // const [getBlogContent, setGetBlogContent] = useState([]);
  // const getData = (blog) => {
  //   setGetBlogContent(blog);
  // }
  return (
    <div className="App">
      <div className="container">
        <Routes>
          {/*<Route path="/" element={<HomePage data={getData}/>} />*/}
          {/*<Route path="/blog/:id" element={<BlogPost content={getBlogContent}/>} />*/}
          <Route path="/" element={<ASVSPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
