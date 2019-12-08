import {UsersContext} from "./UsersContext";

const App = () => {

const contextValue = useUsers();

return (
    <div className={'App'}>
      <UsersContext.Provider value={contextValue}>
        <Main/>
      </UsersContext.Provider>
    </div>
   );
 };

 export default App;