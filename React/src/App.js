import React from 'react';
import Header from './components/header';
import PizzaCards from './components/pizzacards'

class App extends React.Component {
  state = {
    pizzas : []
  }

  render() {
    return (
      <div className="App">
        <Header/>
        {/* <Todo todos={todos} addTodos={addTodos} formData={formData} updateFormData={updateFormData}/> */}
        <PizzaCards />
        {/* <CardPizza pizzas={pizzas} addPizzas={addPizzas} formData={formData} updateFormData={updateFormData}/> */}
      </div>
    );
  }
}


// function App() {

//   //const [formData, updateFormData] = useState(initialFormData);

//   const [pizzas, addPizzas] = useState([]);


// }

export default App;
