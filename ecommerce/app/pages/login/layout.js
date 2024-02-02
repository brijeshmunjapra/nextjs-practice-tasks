
const LoginLayout = ({ children }) => {
    return (
      <div style={{height:"100vh", 
                   width:"100wh", 
                   display:"flex", 
                   alignItems:"center", 
                   justifyContent:"center"}}>
     
        {children}
   
      </div>
    );
  };
  
  export default LoginLayout;
  