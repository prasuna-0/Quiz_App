import React, { createContext, useState, useContext,useEffect} from 'react'

export const StateContext=createContext();
const GetFreshContext = () => {
  if (localStorage.getItem("context") == null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        ParticipantId: 0,
        TimeTaken: 0,
        SelectedOptions: []
      })
    );
  }
  return JSON.parse(localStorage.getItem("context"));
};
    export default function UseStateContext(){
        const { context, setContext } = useContext(StateContext);
       return useContext(StateContext);
    //     return {
    //     context,
    //     setContext: obj => { 
    //         setContext(prevContext => ({ ...prevContext, ...obj })) },
    //         resetContext: ()=>{
    //         localStorage.removeItem('context')
    //         setContext(GetFreshContext())
    //     }
    // };
    }
    
export function ContextProvider({children}) {
    const [context,setContext]=useState(GetFreshContext());
     useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context]);

    useEffect(() => {
  console.log("Saving to localStorage:", context);
  localStorage.setItem('context', JSON.stringify(context));
}, [context]);

const resetContext = () => {
    localStorage.removeItem("context");
    const fresh = GetFreshContext();
    setContext(fresh);
  };
  return (
    <StateContext.Provider value= {{ context , setContext, resetContext}} >
        {children}
    </StateContext.Provider>
  )
}
