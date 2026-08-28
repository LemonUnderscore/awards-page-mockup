import './App.css'
import AwardListComponent from './components/AwardListComponent'

function App() {
  return (
    <>
      <section id="center">
        <div className="header">
          <h1>This is the Header</h1>
        </div>
      </section>

      <section id="spacer"></section>

      <AwardListComponent/>

      <section id="spacer"></section>

      <section id="footer">
        <div id="footer-left">
          <h2>This is the Footer 🦶</h2>
        </div>

        <div id="footer-right">
          <h2>Made by Conor Clerkin</h2>
          <p>as a mockup for a job interview</p>
        </div>

      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
